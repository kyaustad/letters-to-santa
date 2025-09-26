"use client";

import { Button } from "@/components/ui/button";
import {
  ConfirmRemoveAlert,
  EditItemDialog,
} from "@/features/cart/components/cart-button";
import { InProgressProductWithProduct } from "@/features/products/utils/product-list";
import {
  ArrowLeftIcon,
  Loader2,
  SquarePenIcon,
  CheckCircleIcon,
  CreditCardIcon,
} from "lucide-react";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useCart } from "@/features/cart/components/cart-context";
import { ProductImage } from "@/features/products/components/product-image";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { calculateDiscounts, formatCurrency } from "@/lib/discount-calculator";
import { Badge } from "@/components/ui/badge";
import { CheckoutForm } from "@/features/payments/components/checkout-form";
import { Turnstile } from "@/features/turnstile/components/turnstile";
import { verifyTurnstileToken } from "@/features/turnstile/actions";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileSuccess, setTurnstileSuccess] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);
  const router = useRouter();
  const { cart, cartWithProducts } = useCart();
  const [discountBreakdown, setDiscountBreakdown] = useState(
    calculateDiscounts([]),
  );

  useEffect(() => {
    if (cart && cartWithProducts) {
      const breakdown = calculateDiscounts(cartWithProducts.products);
      setDiscountBreakdown(breakdown);
      setIsLoading(false);
    }
  }, [cart, cartWithProducts]);

  const validateTurnstileSuccess = async (token: string) => {
    const response = await verifyTurnstileToken(token);
    if (response.success) {
      setTurnstileSuccess(true);
    } else {
      setTurnstileSuccess(false);
      setTurnstileError(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24 max-w-3xl mx-auto mb-48">
      <div className="flex flex-row gap-4 w-full justify-between items-center text-center">
        <Button variant="secondary" size="sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
          Back
        </Button>
        <h1 className="text-4xl font-semibold text-center">Checkout</h1>
        <div></div>
      </div>
      <Separator />

      {/* Discount Information Section */}
      <div className="w-full p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
          {`Bundle Discount Information`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
          <ul className="flex flex-col gap-1 list-disc">
            <li className="ml-4">
              <span className="font-medium">{`1 item:`}</span>
              {` $9.89 (no discount)`}
            </li>
            <li className="ml-4">
              <span className="font-medium">{`2 items:`}</span>
              {` 10% off all items`}
            </li>
            <li className="ml-4">
              <span className="font-medium">{`3 items:`}</span>
              {` 15% off all items`}
            </li>
          </ul>
          <ul className="flex flex-col gap-1 list-disc">
            <li className="ml-4">
              <span className="font-medium">{`4+ items:`}</span>
              {` First 3 items get
              15% off`}
            </li>
            <li className="ml-4">
              <span className="font-medium">{`Additional items:`}</span>
              {` $7.89 each
              (addon price)`}
            </li>
            <p className="ml-2 text-xs text-blue-600 dark:text-blue-400 mt-2">
              {`*All prices shown include applicable discounts`}
            </p>
          </ul>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="w-full">
          {discountBreakdown.totalSavings > 0 && (
            <div className="flex flex-col gap-4 w-full p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex flex-row gap-2 items-center justify-center">
                <CheckCircleIcon className="size-6 text-green-600 dark:text-green-400" />
                <p className="text-xl font-semibold text-green-800 dark:text-green-200">
                  Discount Applied!
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg text-green-700 dark:text-green-300">
                  {discountBreakdown.explanation}
                </p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200 mt-2">
                  You saved {formatCurrency(discountBreakdown.totalSavings)}!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-4 w-full p-4 border-2 border-border rounded-md">
        {cart &&
          cartWithProducts &&
          discountBreakdown.items.map((item, index) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              itemBreakdown={item}
            />
          ))}
      </div>
      <div className="flex flex-col gap-4 w-full p-4 border-2 border-border rounded-md bg-muted/30">
        <div className="flex flex-row gap-4 w-full justify-between items-center">
          <p className="text-xl font-medium">Items</p>
          <p className="text-xl font-medium">
            {cartWithProducts?.products.length || 0}
          </p>
        </div>
        <div className="flex flex-row gap-4 w-full justify-between items-center">
          <p className="text-xl font-medium">Subtotal</p>
          <p className="text-xl font-medium">
            {formatCurrency(discountBreakdown.originalTotal)}
          </p>
        </div>
        {discountBreakdown.totalSavings > 0 && (
          <>
            <div className="flex flex-row gap-4 w-full justify-between items-center">
              <p className="text-xl font-medium text-green-600 dark:text-green-400">
                Discounts
              </p>
              <p className="text-xl font-medium text-green-600 dark:text-green-400">
                -{formatCurrency(discountBreakdown.totalSavings)}
              </p>
            </div>
            <Separator />
          </>
        )}
        <div className="flex flex-row gap-4 w-full justify-between items-center">
          <p className="text-3xl font-bold">Total</p>
          <p className="text-3xl font-bold">
            {formatCurrency(discountBreakdown.discountedTotal)}
          </p>
        </div>
        {discountBreakdown.totalSavings > 0 && (
          <div className="text-center pt-2">
            <Badge variant="secondary" className="text-sm">
              You saved {formatCurrency(discountBreakdown.totalSavings)}!
            </Badge>
          </div>
        )}
      </div>
      <CheckoutForm
        className="w-full p-4 border-2 border-border rounded-md bg-muted/30 h-full space-y-4"
        onSuccess={() => {
          router.push("/checkout/payment");
        }}
      >
        <div className="flex flex-col gap-2 w-full justify-between items-center">
          <Turnstile
            onSuccess={validateTurnstileSuccess}
            onError={() => {
              setTurnstileError(true);
            }}
          />
          {turnstileError && (
            <div className="text-center pt-2">
              <Badge variant="destructive" className="text-sm">
                {`Human verification failed. Please try refreshing the page and try again.`}
              </Badge>
            </div>
          )}
          <Button
            disabled={!turnstileSuccess || turnstileError}
            variant="secondary"
            className="w-full text-xl font-light min-h-16"
            size="lg"
          >
            <CreditCardIcon className="size-6" />
            {`Proceed to Payment`}
          </Button>
        </div>
      </CheckoutForm>
    </div>
  );
}

export function CartItem({
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
    <div className="bg-card p-2 rounded-md border border-border flex flex-col md:flex-row gap-2 w-full">
      <ProductImage
        image={product.product.image}
        width={400}
        height={700}
        className="max-h-52 object-contain rounded-md mx-auto aspect-square"
        imageClassName=" object-contain"
      />
      <div className="flex flex-col gap-2 justify-between items-center w-full p-4 border-2 border-border rounded-md">
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <p className="text-xl font-semibold">{product.product.name}</p>
          <div className="flex flex-col items-end gap-1">
            {itemBreakdown.savings > 0 ? (
              <>
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-lg text-muted-foreground line-through">
                    {formatCurrency(itemBreakdown.originalPrice)}
                  </p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(itemBreakdown.discountedPrice)}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {itemBreakdown.discountType === "percentage"
                    ? "15% off"
                    : itemBreakdown.discountType === "addon"
                      ? "Addon price"
                      : "Discounted"}
                </Badge>
              </>
            ) : (
              <p className="text-lg font-semibold">
                {formatCurrency(itemBreakdown.discountedPrice)}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center w-full justify-between">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-0 items-start">
              <p className="text-sm ">{`Recipient: `}</p>
              <p className="text-sm text-muted-foreground">{product.name}</p>
            </div>
            <div className="flex flex-col gap-0 items-start">
              <p className="text-sm ">{`Address: `}</p>
              <p className="text-sm text-muted-foreground">{`${product.address.street} ${product.address.city} ${product.address.state}, ${product.address.zip} ${product.address.country}`}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end h-full w-full md:w-auto">
            <EditItemDialog product={product}>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs max-h-6 w-full"
              >
                <SquarePenIcon className="size-4" />
                {`Edit`}
              </Button>
            </EditItemDialog>
            <ConfirmRemoveAlert product={product}>
              <Button
                variant="default"
                size="sm"
                className="text-xs max-h-6 w-full"
              >
                <TrashIcon className="size-4" />
                {`Remove`}
              </Button>
            </ConfirmRemoveAlert>
          </div>
        </div>
      </div>
    </div>
  );
}
