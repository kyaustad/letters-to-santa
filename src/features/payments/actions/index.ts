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
  console.log("=== STARTING createPaymentIntent ===");
  console.log("Amount:", amount);
  console.log("Customer Name:", customerName);
  console.log("Customer Email:", customerEmail);
  console.log("Customer Phone:", customerPhone ? "***masked***" : "missing");
  console.log("Environment:", process.env.NODE_ENV);

  if (
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    customerName === "" ||
    customerEmail === "" ||
    customerPhone === ""
  ) {
    console.log("ERROR: Missing required fields");
    return null;
  }

  try {
    console.log("Creating Stripe payment intent...");
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

    console.log("Payment intent created successfully:", {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
    });
    console.log("=== createPaymentIntent COMPLETED SUCCESSFULLY ===");

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("=== ERROR in createPaymentIntent ===");
    console.error("Error details:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error",
    );
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
  console.log("=== STARTING successfulOrderActions ===");
  console.log("Payment Intent:", paymentIntent);
  console.log("Cart products count:", cart?.products?.length);
  console.log("Environment:", process.env.NODE_ENV);

  try {
    console.log("Retrieving payment intent from Stripe...");
    const intent = await stripe.paymentIntents.retrieve(paymentIntent);
    console.log("Payment intent retrieved:", {
      id: intent.id,
      status: intent.status,
      amount: intent.amount,
      hasMetadata: !!(
        intent.metadata?.customerName &&
        intent.metadata?.customerEmail &&
        intent.metadata?.customerPhone
      ),
    });

    if (intent && intent.status === "succeeded") {
      console.log("Payment succeeded, processing order...");

      console.log("Testing database connection...");
      const products = JSON.stringify(cart.products);
      console.log("Products serialized, length:", products.length);

      console.log("Checking for existing order...");
      const existingOrder = await db.query.orders.findFirst({
        where: eq(orders.paymentIntentId, paymentIntent),
      });

      if (existingOrder) {
        console.log("Order already exists, skipping:", existingOrder.id);
        return false;
      }

      console.log("Creating new order in database...");
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
        console.log("ERROR: No order returned from database insert");
        return false;
      }

      console.log("Order created successfully:", {
        orderId: order[0].id,
        paymentIntentId: order[0].paymentIntentId,
      });

      // Send order confirmation email
      try {
        console.log("Sending order confirmation email...");
        await sendOrderConfirmationEmail(order[0]);
        console.log("Order confirmation email sent successfully");
      } catch (emailError) {
        console.error("Failed to send order confirmation email:", emailError);
        // Don't fail the entire operation if email fails
      }

      console.log("=== successfulOrderActions COMPLETED SUCCESSFULLY ===");
      return true;
    }

    console.log("Payment intent not succeeded, status:", intent?.status);
    return false;
  } catch (error) {
    console.error("=== ERROR in successfulOrderActions ===");
    console.error("Error details:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error",
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );
    return false;
  }
}
