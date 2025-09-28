"use server";

import { Resend } from "resend";
import { env } from "@/env";
import { Order } from "@/db/schema";
import {
  EMAIL_TEMPLATES,
  generateOrderItemsHTML,
  generateDiscountRowHTML,
} from "@/features/email/utils/templates";
import { calculateDiscounts } from "@/lib/discount-calculator";
import { InProgressProductWithProduct } from "@/features/products/utils/product-list";

export const sendTestEmail = async () => {
  const resend = new Resend(env.RESEND_API_KEY);
  const response = await resend.emails.send({
    from: "Letters From Santa <no-reply@santa.kyleaustad.com>",
    to: "kyle@kyleaustad.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
  return response;
};

export const sendOrderConfirmationEmail = async (order: Order) => {
  console.log("=== STARTING sendOrderConfirmationEmail ===");
  console.log("Order ID:", order.id);
  console.log("Customer Email:", order.email);
  console.log("Environment:", process.env.NODE_ENV);

  try {
    console.log("Initializing Resend client...");
    const resend = new Resend(env.RESEND_API_KEY);

    // Parse the products from JSON
    console.log("Parsing order products...");
    const orderProducts = order.products as InProgressProductWithProduct[];
    console.log("Products parsed, count:", orderProducts.length);

    // Calculate discounts for the order
    console.log("Calculating discounts...");
    const discountBreakdown = calculateDiscounts(orderProducts);
    console.log("Discounts calculated:", {
      originalTotal: discountBreakdown.originalTotal,
      discountedTotal: discountBreakdown.discountedTotal,
      totalSavings: discountBreakdown.totalSavings,
    });

    // Generate order items HTML
    const orderItemsHTML = generateOrderItemsHTML(
      orderProducts.map((item) => ({
        product: item.product,
        name: item.name,
        address: item.address,
        message:
          item.message.length > 100
            ? item.message.substring(0, 100) + "..."
            : item.message,
        originalPrice: discountBreakdown.items.find(
          (i) => i.product.id === item.id,
        )?.originalPrice,
        discountedPrice: discountBreakdown.items.find(
          (i) => i.product.id === item.id,
        )?.discountedPrice,
        savings: discountBreakdown.items.find((i) => i.product.id === item.id)
          ?.savings,
        discountType: discountBreakdown.items.find(
          (i) => i.product.id === item.id,
        )?.discountType,
      })),
    );

    // Generate discount row HTML
    const discountRowHTML = generateDiscountRowHTML(
      discountBreakdown.totalSavings,
    );

    // Format the email content
    const emailContent = EMAIL_TEMPLATES.orderConfirmation
      .replace(/%%BASE_URL%%/g, env.NEXT_PUBLIC_BASE_URL)
      .replace(/%%ORDER_NUMBER%%/g, order.id.toString())
      .replace(/%%PAYMENT_ID%%/g, order.paymentIntentId)
      .replace(
        /%%ORDER_DATE%%/g,
        order.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
      .replace(/%%CUSTOMER_NAME%%/g, order.name)
      .replace(/%%CUSTOMER_EMAIL%%/g, order.email)
      .replace(/%%CUSTOMER_PHONE%%/g, order.phone)
      .replace(/%%ORDER_ITEMS%%/g, orderItemsHTML)
      .replace(
        /%%SUBTOTAL%%/g,
        `$${discountBreakdown.originalTotal.toFixed(2)}`,
      )
      .replace(/%%DISCOUNT_ROW%%/g, discountRowHTML)
      .replace(/%%TOTAL%%/g, `$${discountBreakdown.discountedTotal.toFixed(2)}`)
      .replace(/%%CONTACT_EMAIL%%/g, "support@lettersfromsanta.com");

    // Send the email
    console.log("Sending email via Resend...");
    const response = await resend.emails.send({
      from: "Letters From Santa <no-reply@santa.kyleaustad.com>",
      to: order.email,
      subject: `Order Confirmation - ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", response);
    console.log("=== sendOrderConfirmationEmail COMPLETED SUCCESSFULLY ===");
    return response;
  } catch (error) {
    console.error("=== ERROR in sendOrderConfirmationEmail ===");
    console.error("Error details:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error",
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );
    throw new Error("Failed to send order confirmation email");
  }
};
