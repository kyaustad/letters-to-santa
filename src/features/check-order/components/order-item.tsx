"use client";

import { ProductImage } from "@/features/products/components/product-image";
import { InProgressProductWithProduct } from "@/features/products/utils/product-list";
import { Badge } from "@/components/ui/badge";

export default function OrderItem({
  product,
  itemBreakdown,
}: {
  product: InProgressProductWithProduct;
  itemBreakdown: {
    product: InProgressProductWithProduct;
    originalPrice: number;
    discountedPrice: number;
    savings: number;
    discountType: "none" | "percentage" | "addon";
  };
}) {
  return (
    <div className="flex flex-col gap-2 bg-muted p-4 rounded-md shadow-md w-full border-2 border-secondary/20">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <ProductImage
          image={product.product.image}
          className="min-w-32 h-48 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 w-full justify-between items-start">
            <p className="text-lg font-semibold">{product.product.name}</p>
            <div className="flex flex-col items-end gap-1">
              {itemBreakdown.savings > 0 ? (
                <>
                  <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm text-muted-foreground line-through">
                      ${itemBreakdown.originalPrice.toFixed(2)}
                    </p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      ${itemBreakdown.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                  {itemBreakdown.discountType === "percentage" ? (
                    <Badge
                      variant="secondary"
                      className="text-sm"
                    >{`15% off`}</Badge>
                  ) : itemBreakdown.discountType === "addon" ? (
                    <Badge variant="secondary" className="text-sm">
                      Addon price
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-sm">
                      Discounted
                    </Badge>
                  )}
                </>
              ) : (
                <p className="text-lg font-semibold">
                  ${itemBreakdown.discountedPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="flex flex-col gap-0 items-start">
              <p className="text-sm font-medium">Recipient:</p>
              <p className="text-sm text-muted-foreground">{product.name}</p>
            </div>
            <div className="flex flex-col gap-0 items-start">
              <p className="text-sm font-medium">Address:</p>
              <p className="text-sm text-muted-foreground">
                {`${product.address.street}, ${product.address.city}, ${product.address.state} ${product.address.zip}, ${product.address.country}`}
              </p>
            </div>
            <div className="flex flex-col gap-0 items-start">
              <p className="text-sm font-medium">Message:</p>
              <p className="text-sm text-muted-foreground">
                {product.message.length > 100
                  ? product.message.substring(0, 100) + "..."
                  : product.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
