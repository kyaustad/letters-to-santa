"use server";

import { env } from "@/env";
import {
  InProgressOrder,
  InProgressOrderWithProducts,
} from "@/features/products/utils/product-list";
import Stripe from "stripe";
import { calculateDiscounts } from "@/lib/discount-calculator";
import { productList } from "@/features/products/utils/product-list";
import { db, orders } from "@/db";
import { eq } from "drizzle-orm";
import { sendOrderConfirmationEmail } from "@/lib/emails";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function createPaymentIntent({
  amount,
  customerName,
  customerEmail,
  customerPhone,
}: {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}): Promise<string | null> {
  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    customerName === "" ||
    customerEmail === "" ||
    customerPhone === ""
  ) {
    return null;
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName,
        customerEmail,
        customerPhone,
      },
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return null;
  }
}

export async function calculateOrderTotal(
  cart: InProgressOrder,
): Promise<number> {
  try {
    // Validate cart exists and has products
    if (!cart || !cart.products || cart.products.length === 0) {
      return 0;
    }

    // Convert InProgressOrder to InProgressOrderWithProducts for discount calculation
    const cartWithProducts = {
      products: cart.products.map((product) => {
        const productData = productList.find((p) => p.id === product.productId);
        if (!productData) {
          throw new Error(`Product with ID ${product.productId} not found`);
        }
        return {
          ...product,
          product: productData,
        };
      }),
      total: 0, // Will be calculated by discount system
    };

    // Calculate discounts using the same logic as client-side
    const discountBreakdown = calculateDiscounts(cartWithProducts.products);

    // Return the server-calculated discounted total
    return discountBreakdown.discountedTotal;
  } catch (error) {
    console.error("Error calculating order total:", error);
    throw new Error("Failed to calculate order total");
  }
}

export async function validateCartTotal(
  cart: InProgressOrder,
  clientCalculatedTotal: number,
): Promise<{ isValid: boolean; serverTotal: number; difference: number }> {
  try {
    const serverTotal = await calculateOrderTotal(cart);
    const difference = Math.abs(serverTotal - clientCalculatedTotal);
    const isValid = difference < 0.01; // Allow for minor floating point differences

    return {
      isValid,
      serverTotal,
      difference,
    };
  } catch (error) {
    console.error("Error validating cart total:", error);
    return {
      isValid: false,
      serverTotal: 0,
      difference: clientCalculatedTotal,
    };
  }
}

export async function successfulOrderActions(
  paymentIntent: string,
  cart: InProgressOrderWithProducts,
): Promise<boolean> {
  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntent);
    // console.log("Intent", intent);
    if (intent && intent.status === "succeeded") {
      const products = await JSON.stringify(cart.products);
      const existingOrder = await db.query.orders.findFirst({
        where: eq(orders.paymentIntentId, paymentIntent),
      });
      if (existingOrder) {
        return false;
      }
      const order = await db
        .insert(orders)
        .values({
          paymentIntentId: paymentIntent,
          status: "pending",
          total: intent.amount,
          products: products,
          name: intent.metadata.customerName,
          email: intent.metadata.customerEmail,
          phone: intent.metadata.customerPhone,
        })
        .returning();
      if (!order || order.length === 0) {
        return false;
      }

      // Send order confirmation email
      try {
        await sendOrderConfirmationEmail(order[0]);
        console.log(`Order confirmation email sent for order ${paymentIntent}`);
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
        // Don't fail the entire operation if email fails
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error("Error successful order actions:", error);
    return false;
  }
}
