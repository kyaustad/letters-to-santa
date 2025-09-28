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
  const [cartLoaded, setCartLoaded] = useState(false);

  // Wait for cart to load properly
  useEffect(() => {
    console.log("=== CART LOADING CHECK ===");
    console.log("Cart exists:", !!cart);
    console.log("CartWithProducts exists:", !!cartWithProducts);
    console.log("Cart products count:", cart?.products?.length || 0);
    console.log(
      "CartWithProducts count:",
      cartWithProducts?.products?.length || 0,
    );

    if (cart && cartWithProducts) {
      console.log("Cart fully loaded, setting cartLoaded to true");
      setCartLoaded(true);
    } else {
      console.log("Cart not fully loaded yet, waiting...");
      // Try again after a short delay
      const timer = setTimeout(() => {
        if (cart && cartWithProducts) {
          console.log("Cart loaded after delay");
          setCartLoaded(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [cart, cartWithProducts]);

  const processOrder = async () => {
    console.log("=== STARTING processOrder ===");
    console.log("Redirect Status:", redirectStatus);
    console.log("Payment Intent:", paymentIntent);
    console.log("Has Cart:", !!cart);
    console.log("Has Cart With Products:", !!cartWithProducts);
    console.log("Cart Loaded:", cartLoaded);
    console.log("Environment:", process.env.NODE_ENV);

    if (redirectStatus === "succeeded" && paymentIntent) {
      let cartToUse = cartWithProducts;

      // Fallback: try to get cart from localStorage if context isn't working
      if (!cartToUse || !cart) {
        console.log(
          "Cart context not working, trying localStorage fallback...",
        );
        try {
          const localStorageCart = localStorage.getItem("cart");
          if (localStorageCart) {
            const parsedCart = JSON.parse(localStorageCart);
            console.log("Found cart in localStorage:", parsedCart);
            cartToUse = parsedCart;
          }
        } catch (error) {
          console.error("Error parsing localStorage cart:", error);
        }
      }

      if (
        !cartToUse ||
        !cartToUse.products ||
        cartToUse.products.length === 0
      ) {
        console.log(
          "ERROR: Missing cart data from both context and localStorage",
        );
        console.log("Cart:", cart);
        console.log("CartWithProducts:", cartWithProducts);
        console.log("LocalStorage cart:", cartToUse);
        toast.error("Missing cart data. Please contact support.");
        return;
      }

      console.log("Cart data found, calling successfulOrderActions...");
      console.log("Cart products:", cartToUse.products);

      const success = await successfulOrderActions(paymentIntent, cartToUse);

      console.log("successfulOrderActions result:", success);

      if (success) {
        console.log("Order processing successful, clearing cart");
        toast.success("Order Placed!");
        clearCart(false);
        // Also clear localStorage
        localStorage.removeItem("cart");
      } else {
        console.log("Order processing failed");
        toast.error("Failed to validate order.");
      }
    } else {
      console.log("Payment not succeeded or missing payment intent");
    }
  };

  useEffect(() => {
    console.log("=== PAYMENT SUCCESS USEEFFECT ===");
    console.log("Redirect Status:", redirectStatus);
    console.log("Payment Intent:", paymentIntent);
    console.log("Is Loading:", isLoading);
    console.log("Cart Loaded:", cartLoaded);

    if (
      redirectStatus === "succeeded" &&
      paymentIntent &&
      isLoading &&
      cartLoaded
    ) {
      console.log("All conditions met, processing order...");
      processOrder().then(() => setIsLoading(false));
    } else {
      console.log("Conditions not met yet, waiting...");
    }
  }, [redirectStatus, paymentIntent, isLoading, cartLoaded]);

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
