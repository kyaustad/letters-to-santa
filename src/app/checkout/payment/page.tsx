"use client";

import { StripeDemo } from "@/features/payments/components/stripe-demo";
import { useCart } from "@/features/cart/components/cart-context";
import { redirect } from "next/navigation";
import { calculateOrderTotal } from "@/features/payments/actions";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/discount-calculator";
import { formatPhoneNumber } from "@/lib/utils";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { checkoutFormSchema } from "@/features/payments/components/checkout-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrderPayment() {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<z.infer<
    typeof checkoutFormSchema
  > | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const processCart = async (): Promise<number> => {
    if (!cart) {
      redirect("/shop");
    }
    const orderTotal = await calculateOrderTotal(cart);
    return orderTotal;
  };

  useEffect(() => {
    setIsLoading(true);
    processCart().then((total) => setOrderTotal(total));
    const checkoutData = localStorage.getItem("checkoutData");
    const checkoutDataObject = checkoutData ? JSON.parse(checkoutData) : null;
    setCheckoutData(checkoutDataObject);
    setIsLoading(false);
  }, [cart]);

  if (!cart) {
    redirect("/shop");
  }
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
      <div className="flex flex-row gap-4 w-full justify-center items-center text-center relative mb-4">
        <a href={`${window.location.origin}/checkout`}>
          <Button variant="secondary" size="sm" className="absolute left-0">
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
        </a>
      </div>
      <h1 className="text-4xl font-semibold text-center">Order Payment</h1>
      <h2 className="text-xl ">Order Total: {formatCurrency(orderTotal)}</h2>
      <p className="text-sm text-muted-foreground">
        {`Please choose a payment method and enter your payment information to complete your order.`}
      </p>
      <Separator />
      <div className="flex flex-col gap-2 w-full p-4 border-2 border-border rounded-md bg-muted/30 max-w-6xl">
        <h3 className="text-lg font-medium">Order Information</h3>
        <div className="flex flex-row w-full justify-between items-center">
          <p className=" text-muted-foreground">{`Name: `}</p>
          <p className=" text-foreground">{`${checkoutData?.customerName}`}</p>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <p className=" text-muted-foreground">{`Email: `}</p>
          <p className=" text-foreground">{`${checkoutData?.customerEmail}`}</p>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <p className=" text-muted-foreground">{`Phone: `}</p>
          <p className=" text-foreground">{`${formatPhoneNumber(checkoutData?.customerPhone)}`}</p>
        </div>
      </div>

      {orderTotal > 0 && (
        <StripeDemo
          amount={orderTotal}
          customerName={checkoutData?.customerName || ""}
          customerEmail={checkoutData?.customerEmail || ""}
          customerPhone={checkoutData?.customerPhone || ""}
        />
      )}
    </div>
  );
}
