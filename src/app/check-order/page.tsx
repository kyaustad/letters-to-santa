"use client";

import { HomeIcon, Loader2, RotateCcwIcon } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/components/cart-context";
import { successfulOrderActions } from "@/features/payments/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Order } from "@/db/schema";
import { getOrderFromPaymentIntent } from "@/features/check-order/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import OrderItem from "@/features/check-order/components/order-item";
import { InProgressProductWithProduct } from "@/features/products/utils/product-list";
import { calculateDiscounts, formatCurrency } from "@/lib/discount-calculator";
import OrderLookupAndList from "@/features/check-order/components/order-lookup-and-list";

export default function CheckOrder() {
  const { cart, clearCart, cartWithProducts } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderFromPaymentIntent = async (paymentIntentFromUrl: string) => {
    const orderResponse = await getOrderFromPaymentIntent(paymentIntentFromUrl);
    console.log("orderResponse", orderResponse);
    setOrder(orderResponse);
  };

  useEffect(() => {
    const urlPaymentIntent = searchParams.get("payment_intent");
    if (urlPaymentIntent) {
      setIsLoading(true);
      setPaymentIntent(urlPaymentIntent);
      fetchOrderFromPaymentIntent(urlPaymentIntent);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  type BadgeVariant =
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | "accent"
    | "tertiary"
    | null
    | undefined;

  const getStatusBadgeVariant = (status: string) => {
    if (status === "pending") return "tertiary" as BadgeVariant;
    if (status === "processing") return "accent" as BadgeVariant;
    if (status === "shipped") return "secondary" as BadgeVariant;
    return "secondary" as BadgeVariant;
  };

  const handleCheckDifferentOrder = () => {
    setOrder(null);
    setPaymentIntent(null);
    window.location.href = "/check-order";
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full mt-24 mb-24 max-w-2xl">
      <div className="flex flex-row w-full justify-between max-w-2xl">
        <Button variant="default" size="sm" onClick={() => router.push("/")}>
          <HomeIcon className="size-4" />
          Home
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCheckDifferentOrder}
          disabled={isLoading || !order}
        >
          <RotateCcwIcon className="size-4" />
          Check a different Order
        </Button>
      </div>
      <h1 className="text-4xl font-semibold ">{`Check an Order`}</h1>

      {/* search criteria to look up an order. Either by Email and Phone or Payment Intent ID */}
      {!order && <OrderLookupAndList />}

      {isLoading && <Loader2 className="animate-spin size-10" />}
      {order && (
        <Card className="w-full max-w-2xl">
          <CardHeader className="px-2 md:px-6">
            <CardTitle>Order Details</CardTitle>
            <CardDescription>{`Details for your order placed on ${order.createdAt.toLocaleDateString()}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 w-full px-2 md:px-6">
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-3xl text-foreground">{`Order Status: `}</p>
              <Badge
                variant={getStatusBadgeVariant(order.status)}
                className="text-lg"
              >
                {order.status.toUpperCase()}
              </Badge>
            </div>
            <Separator />

            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Order ID: `}</p>
              <p className="text-lg text-muted-foreground">{order.id}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Payment ID: `}</p>
              <p className="text-lg text-muted-foreground">
                {order.paymentIntentId}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Order Date: `}</p>
              <p className="text-lg text-muted-foreground">
                {format(order.createdAt, "LLL d, yyyy hh:mm a")}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Last Updated: `}</p>
              <p className="text-lg text-muted-foreground">
                {format(order.updatedAt, "LLL d, yyyy hh:mm a")}
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-0 w-full">
              <p className="text-3xl text-foreground">{`Customer Info: `}</p>
              <p className="text-sm text-muted-foreground">{`This is the information you provided when you placed your order.`}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Name: `}</p>
              <p className="text-lg text-muted-foreground">{order.name}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Email: `}</p>
              <p className="text-lg text-muted-foreground">{order.email}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
              <p className="text-lg text-foreground">{`Phone: `}</p>
              <p className="text-lg text-muted-foreground">{order.phone}</p>
            </div>

            <Separator />

            {/* Order Items */}
            {order &&
              (() => {
                const orderProducts =
                  order.products as InProgressProductWithProduct[];
                const discountBreakdown = calculateDiscounts(orderProducts);

                return (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Order Items</h3>
                    {orderProducts.map((product) => {
                      const itemBreakdown = discountBreakdown.items.find(
                        (item) => item.product.id === product.id,
                      );
                      return (
                        <OrderItem
                          key={product.id}
                          product={product}
                          itemBreakdown={itemBreakdown!}
                        />
                      );
                    })}

                    {/* Order Summary */}
                    <div className="bg-muted/30 p-4 rounded-md border-2 border-border">
                      <h3 className="text-lg font-semibold mb-3 text-center">
                        Order Summary
                      </h3>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                          <p className="text-base font-medium">Subtotal:</p>
                          <p className="text-base font-medium">
                            {formatCurrency(discountBreakdown.originalTotal)}
                          </p>
                        </div>
                        {discountBreakdown.totalSavings > 0 && (
                          <div className="flex flex-row justify-between items-center">
                            <p className="text-base font-medium text-green-600 dark:text-green-400">
                              {`Discount:`}
                            </p>
                            <p className="text-base font-medium text-green-600 dark:text-green-400">
                              -{formatCurrency(discountBreakdown.totalSavings)}
                            </p>
                          </div>
                        )}
                        <Separator />
                        <div className="flex flex-row justify-between items-center">
                          <p className="text-xl font-bold">Total:</p>
                          <p className="text-xl font-bold">
                            {formatCurrency(discountBreakdown.discountedTotal)}
                          </p>
                        </div>
                        {discountBreakdown.totalSavings > 0 && (
                          <div className="text-center pt-2">
                            <Badge variant="secondary" className="text-sm">
                              You saved{" "}
                              {formatCurrency(discountBreakdown.totalSavings)}!
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
