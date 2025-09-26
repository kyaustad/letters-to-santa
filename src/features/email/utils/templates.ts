// Helper function to generate order items HTML
export function generateOrderItemsHTML(
  items: Array<{
    product: {
      name: string;
      price: number;
    };
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    message: string;
    originalPrice?: number;
    discountedPrice?: number;
    savings?: number;
    discountType?: "none" | "percentage" | "addon";
  }>,
): string {
  return items
    .map(
      (item, index) => `
    <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 10px 0;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; gap: 20px;">
        <div style="flex: 1;">
          <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: 'Belanosima', Arial, sans-serif; margin: 0;">
            ${item.product.name}
          </h4>
        </div>
        <div style="text-align: right; min-width: 120px;">
          ${
            item.savings && item.savings > 0
              ? `
            <p style="color: #6b7280; font-size: 12px; text-decoration: line-through; margin: 0; font-family: Arial, sans-serif;">
              $${item.originalPrice?.toFixed(2) || item.product.price.toFixed(2)}
            </p>
            <p style="color: #dc2626; font-size: 16px; font-weight: 600; margin: 0; font-family: Arial, sans-serif;">
              $${item.discountedPrice?.toFixed(2) || item.product.price.toFixed(2)}
            </p>
            <span style="background-color: #fef2f2; color: #dc2626; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-family: Arial, sans-serif;">
              ${item.discountType === "percentage" ? "15% off" : item.discountType === "addon" ? "Addon price" : "Discounted"}
            </span>
          `
              : `
            <p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0; font-family: Arial, sans-serif;">
              $${item.product.price.toFixed(2)}
            </p>
          `
          }
        </div>
      </div>
      
      <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin: 10px 0;">
        <p style="color: #374151; font-size: 14px; font-family: Arial, sans-serif; margin: 5px 0;">
          <strong>Recipient:</strong> ${item.name}
        </p>
        <p style="color: #374151; font-size: 14px; font-family: Arial, sans-serif; margin: 5px 0;">
          <strong>Address:</strong> ${item.address.street}, ${item.address.city}, ${item.address.state} ${item.address.zip}, ${item.address.country}
        </p>
        <p style="color: #374151; font-size: 14px; font-family: Arial, sans-serif; margin: 5px 0;">
          <strong>Message:</strong> ${item.message.length > 100 ? item.message.substring(0, 100) + "..." : item.message}
        </p>
      </div>
    </div>
  `,
    )
    .join("");
}

// Helper function to generate discount row HTML
export function generateDiscountRowHTML(totalSavings: number): string {
  if (totalSavings <= 0) return "";

  return `
    <tr>
      <td style="padding: 8px 0; color: #059669; font-size: 14px;">
        Discount:
      </td>
      <td style="padding: 8px 0; color: #059669; font-size: 14px; text-align: right;">
        -$${totalSavings.toFixed(2)}
      </td>
    </tr>
  `;
}

export const EMAIL_TEMPLATES = {
  orderConfirmation: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <link
        rel="preload"
        as="image"
        href="https://santa.kyleaustad.com/logo.png"
      />
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
    </head>
    <body style="background-color: #f8fafc; margin: 0; padding: 0;">
      <table
        border="0"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        align="center"
        style="background-color: #f8fafc;"
      >
        <tbody>
          <tr>
            <td style="padding: 20px 0;">
              <table
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  margin: 0 auto;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                "
              >
                <tbody>
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #C94F4F 0%, #963232 100%); padding: 40px 30px; text-align: center;">
                      <img
                        alt="Letters from Santa"
                        src="https://santa.kyleaustad.com/logo.png"
                        style="
                          display: inline-block;
                          outline: none;
                          border: none;
                          text-decoration: none;
                          margin: 0;
                          width: 80px;
                          height: 80px;
                          vertical-align: middle;
                          border-radius: 50%;
                          background-color: rgba(255, 255, 255, 0.1);
                          padding: 10px;
                          image-rendering: -webkit-optimize-contrast;
                          image-rendering: crisp-edges;
                          image-rendering: pixelated;
                          -ms-interpolation-mode: nearest-neighbor;
                          object-fit: contain;
                          object-position: center;
                          max-width: 80px;
                          max-height: 80px;
                        "
                      />
                      <h1
                        style="
                          color: #ffffff;
                          font-size: 28px;
                          font-weight: 700;
                          font-family: 'Belanosima', Arial, sans-serif;
                          text-align: center;
                          margin: 20px 0 10px 0;
                          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        "
                      >
                        Letters from Santa
                      </h1>
                      <p
                        style="
                          color: #fef2f2;
                          font-size: 16px;
                          font-family: Arial, sans-serif;
                          margin: 0;
                          text-align: center;
                        "
                      >
                        Order Confirmation
                      </p>
                    </td>
                  </tr>

                  <!-- Order Details -->
                  <tr>
                    <td style="padding: 30px;">
                      <h2
                        style="
                          color: #1f2937;
                          font-size: 24px;
                          font-weight: 600;
                          font-family: 'Belanosima', Arial, sans-serif;
                          margin: 0 0 20px 0;
                          text-align: center;
                        "
                      >
                        Thank you for your order!
                      </h2>
                      
                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <p
                          style="
                            color: #374151;
                            font-size: 16px;
                            font-family: Arial, sans-serif;
                            margin: 0 0 10px 0;
                            text-align: center;
                          "
                        >
                          <strong>Order Number:</strong> %%ORDER_NUMBER%%
                        </p>
                        <p
                          style="
                            color: #6b7280;
                            font-size: 14px;
                            font-family: Arial, sans-serif;
                            margin: 0;
                            text-align: center;
                          "
                        >
                          Order Date: %%ORDER_DATE%%
                        </p>
                      </div>

                      <!-- Customer Information -->
                      <div style="background-color: #fef7f7; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
                        <h3
                          style="
                            color: #1f2937;
                            font-size: 18px;
                            font-weight: 600;
                            font-family: 'Belanosima', Arial, sans-serif;
                            margin: 0 0 15px 0;
                          "
                        >
                          Customer Information
                        </h3>
                        <p style="color: #374151; font-size: 14px; font-family: Arial, sans-serif; margin: 5px 0;">
                          <strong>Name:</strong> %%CUSTOMER_NAME%%
                        </p>
                        <p style="color: #374151; font-size: 14px; font-family: Arial, sans-serif; margin: 5px 0;">
                          <strong>Email:</strong> %%CUSTOMER_EMAIL%%
                        </p>
                        <p style="color: #374151; font-size: 14px; font-family: Arial, sans-serif; margin: 5px 0;">
                          <strong>Phone:</strong> %%CUSTOMER_PHONE%%
                        </p>
                      </div>

                      <!-- Order Items -->
                      <div style="margin: 20px 0;">
                        <h3
                          style="
                            color: #1f2937;
                            font-size: 18px;
                            font-weight: 600;
                            font-family: 'Belanosima', Arial, sans-serif;
                            margin: 0 0 15px 0;
                          "
                        >
                          Order Items
                        </h3>
                        %%ORDER_ITEMS%%
                      </div>

                      <!-- Order Summary -->
                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h3
                          style="
                            color: #1f2937;
                            font-size: 18px;
                            font-weight: 600;
                            font-family: 'Belanosima', Arial, sans-serif;
                            margin: 0 0 15px 0;
                            text-align: center;
                          "
                        >
                          Order Summary
                        </h3>
                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
                          <tr>
                            <td style="padding: 8px 0; color: #374151; font-size: 14px;">
                              Subtotal:
                            </td>
                            <td style="padding: 8px 0; color: #374151; font-size: 14px; text-align: right;">
                              %%SUBTOTAL%%
                            </td>
                          </tr>
                          %%DISCOUNT_ROW%%
                          <tr style="border-top: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                              Total:
                            </td>
                            <td style="padding: 12px 0; color: #1f2937; font-size: 16px; font-weight: 600; text-align: right;">
                              %%TOTAL%%
                            </td>
                          </tr>
                        </table>
                      </div>

                      <!-- Next Steps -->
                      <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h3
                          style="
                            color: #0c4a6e;
                            font-size: 18px;
                            font-weight: 600;
                            font-family: 'Belanosima', Arial, sans-serif;
                            margin: 0 0 15px 0;
                          "
                        >
                          What's Next?
                        </h3>
                        <p
                          style="
                            color: #0c4a6e;
                            font-size: 14px;
                            font-family: Arial, sans-serif;
                            margin: 0 0 10px 0;
                            line-height: 1.5;
                          "
                        >
                          • Your order is being processed and will be shipped within 2-3 business days
                        </p>
                        <p
                          style="
                            color: #0c4a6e;
                            font-size: 14px;
                            font-family: Arial, sans-serif;
                            margin: 0 0 10px 0;
                            line-height: 1.5;
                          "
                        >
                          • You will receive a shipping confirmation email when your letters are on their way!
                        </p>
                        <p
                          style="
                            color: #0c4a6e;
                            font-size: 14px;
                            font-family: Arial, sans-serif;
                            margin: 0;
                            line-height: 1.5;
                          "
                        >
                          • Your personalized letters will arrive as soon as possible from USPS!
                        </p>
                      </div>

                      <!-- Contact Information -->
                      <div style="text-align: center; margin: 30px 0 20px 0;">
                        <p
                          style="
                            color: #6b7280;
                            font-size: 14px;
                            font-family: Arial, sans-serif;
                            margin: 0 0 10px 0;
                          "
                        >
                          Questions about your order?
                        </p>
                        <a
                          href="mailto:%%CONTACT_EMAIL%%"
                          style="
                            color: #dc2626;
                            text-decoration: none;
                            font-size: 14px;
                            font-family: Arial, sans-serif;
                          "
                        >
                          %%CONTACT_EMAIL%%
                        </a>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p
                        style="
                          color: #6b7280;
                          font-size: 12px;
                          font-family: Arial, sans-serif;
                          margin: 0;
                          line-height: 1.4;
                        "
                      >
                        © 2025 Letters from Santa. All rights reserved.<br>
                        Making Christmas magic, one letter at a time.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>`,
};
