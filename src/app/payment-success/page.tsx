"use client";

import { Loader2 } from "lucide-react";
//http://localhost:3000/payment-success?payment_intent=pi_&payment_intent_client_secret=pi_&redirect_status=succeeded

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/components/cart-context";
import { successfulOrderActions } from "@/features/payments/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const { cart, clearCart, cartWithProducts } = useCart();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const [isLoading, setIsLoading] = useState(true);

  const processOrder = async () => {
    if (redirectStatus === "succeeded" && paymentIntent) {
      if (!cartWithProducts || !cart) {
        return;
      }
      const success = await successfulOrderActions(
        paymentIntent,
        cartWithProducts,
      );
      if (success) {
        toast.success("Order Placed!");
        clearCart(false);
      } else {
        toast.error("Failed to validate order.");
      }
    }
  };

  useEffect(() => {
    if (redirectStatus === "succeeded" && paymentIntent && isLoading) {
      processOrder();
      setIsLoading(false);
    }
  }, [redirectStatus, clearCart, paymentIntent]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  if (redirectStatus !== "succeeded" && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
        <h1 className="text-4xl font-bold text-destructive">Payment Failed</h1>
        <p className="text-lg">Please try again.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24">
      <h1 className="text-4xl font-semibold ">{`Payment Successful!`}</h1>
      <p className="text-lg">Thank you for your purchase!</p>
      <p className="text-xl">{`An email confirmation has been sent to your email address you provided.`}</p>
      <p className="text-xl">
        {`You will receive order updates via email and can check the status of your orders any time from the `}{" "}
        <a href="/check-order" className="text-primary">
          Check an Order
        </a>{" "}
        {` page.`}
      </p>
      <div className="flex flex-row gap-4">
        <a href="/shop" className="text-primary">
          <Button variant="secondary">Back to the Shop</Button>
        </a>
        <a href="/check-order" className="text-primary">
          <Button variant="default">Check an Order</Button>
        </a>
      </div>
    </div>
  );
}
