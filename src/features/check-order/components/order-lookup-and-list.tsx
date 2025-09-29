"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/custom/phone-input";
import { Loader2, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { calculateDiscounts, formatCurrency } from "@/lib/discount-calculator";
import { InProgressProductWithProduct } from "@/features/products/utils/product-list";
import { toast } from "sonner";
import {
  listOrdersFromEmail,
  listOrdersFromPaymentIntent,
  listOrdersFromPhone,
} from "../actions";
import { Order } from "@/db/schema";

const emailSchema = z.object({
  email: z.email("Email is required"),
});

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number is required and must be 10 digits"),
});

const paymentIntentSchema = z.object({
  paymentIntent: z.string().min(1, "Payment ID is required"),
});

export default function OrderLookupAndList() {
  const [selectedTab, setSelectedTab] = useState("email");
  const [foundOrders, setFoundOrders] = useState<Order[] | null>(null);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
    },
  });
  const paymentIntentForm = useForm<z.infer<typeof paymentIntentSchema>>({
    resolver: zodResolver(paymentIntentSchema),
    defaultValues: {
      paymentIntent: "",
    },
  });

  const onSubmitEmail = async (data: z.infer<typeof emailSchema>) => {
    try {
      const foundOrders = await listOrdersFromEmail(data.email);
      setFoundOrders(foundOrders);
    } catch (error) {
      console.error(error);
      toast.error("Error looking up order");
    }
  };
  const onSubmitPhone = async (data: z.infer<typeof phoneSchema>) => {
    try {
      const foundOrders = await listOrdersFromPhone(data.phone);
      setFoundOrders(foundOrders);
    } catch (error) {
      console.error(error);
      toast.error("Error looking up order");
    }
  };
  const onSubmitPaymentIntent = async (
    data: z.infer<typeof paymentIntentSchema>,
  ) => {
    try {
      const foundOrders = await listOrdersFromPaymentIntent(data.paymentIntent);
      setFoundOrders(foundOrders);
    } catch (error) {
      console.error(error);
      toast.error("Error looking up order");
    }
  };

  const getTabTitle = (tab: string) => {
    if (tab === "email") return "Email";
    if (tab === "phone") return "Phone";
    if (tab === "paymentIntent") return "Payment ID";
    return "";
  };

  return (
    <Card className="w-full px-0 mx-0">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          setFoundOrders(null);

          setSelectedTab(value);
        }}
      >
        <CardHeader>
          <CardTitle className="text-lg font-light">{`Lookup Order By:`}</CardTitle>
          <TabsList>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="paymentIntent">Payment ID</TabsTrigger>
          </TabsList>
          <CardContent className="flex flex-col gap-2 w-full mt-4 p-0 ">
            <TabsContent value="email">
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                  className="flex flex-col  w-full gap-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full text-lg font-light"
                    disabled={emailForm.formState.isSubmitting}
                  >
                    {emailForm.formState.isSubmitting ? (
                      <Loader2 className="size-6 animate-spin" />
                    ) : (
                      <SearchIcon className="size-6" />
                    )}
                    Lookup Orders
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="phone">
              <Form {...phoneForm}>
                <form
                  onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
                  className="flex flex-col  w-full gap-4"
                >
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Phone"
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full text-lg font-light"
                    disabled={phoneForm.formState.isSubmitting}
                  >
                    {phoneForm.formState.isSubmitting ? (
                      <Loader2 className="size-6 animate-spin" />
                    ) : (
                      <SearchIcon className="size-6" />
                    )}
                    Lookup Orders
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="paymentIntent">
              <Form {...paymentIntentForm}>
                <form
                  onSubmit={paymentIntentForm.handleSubmit(
                    onSubmitPaymentIntent,
                  )}
                  className="flex flex-col  w-full gap-4"
                >
                  <p className="text-sm text-muted-foreground">
                    {`You can find your Payment ID in the order confirmation email.`}
                  </p>
                  <FormField
                    control={paymentIntentForm.control}
                    name="paymentIntent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Payment ID"
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full text-lg font-light"
                    disabled={paymentIntentForm.formState.isSubmitting}
                  >
                    {paymentIntentForm.formState.isSubmitting ? (
                      <Loader2 className="size-6 animate-spin" />
                    ) : (
                      <SearchIcon className="size-6" />
                    )}
                    Lookup Order
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </CardContent>
        </CardHeader>
      </Tabs>
      <CardContent className="flex flex-col gap-2 w-full mt-4 p-0 m-0">
        {foundOrders && (
          <div className="flex flex-col gap-4 m-4 md:mx-8 p-2 md:p-8 bg-muted rounded-lg shadow-md border border-border">
            {foundOrders.length > 0 ? (
              foundOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">{`No orders found using that ${getTabTitle(selectedTab)}.`}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OrderCard({ order }: { order: Order }) {
  const router = useRouter();
  const orderProducts = order.products as InProgressProductWithProduct[];
  const discountBreakdown = calculateDiscounts(orderProducts);

  const getStatusBadgeVariant = (status: string) => {
    if (status === "pending") return "tertiary";
    if (status === "processing") return "accent";
    if (status === "shipped") return "secondary";
    return "secondary";
  };

  const handleSelectOrder = () => {
    router.push(`/check-order?payment_intent=${order.paymentIntentId}`);
  };

  return (
    <Card
      className="w-full cursor-pointer hover:shadow-lg transition-all duration-500 hover:bg-blue-500/20"
      onClick={handleSelectOrder}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>
              {format(order.createdAt, "MMM d, yyyy 'at' h:mm a")}
            </CardDescription>
          </div>
          <Badge
            variant={getStatusBadgeVariant(order.status)}
            className="text-sm"
          >
            {order.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          {/* Customer Info */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              Customer
            </p>
            <p className="text-base font-semibold">{order.name}</p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
          </div>

          {/* Order Items Summary */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              Items ({orderProducts.length})
            </p>
            <div className="flex flex-col gap-1">
              {orderProducts.slice(0, 2).map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row justify-between items-center p-2 border border-border rounded-md"
                >
                  <p className="text-sm truncate flex-1 mr-2">
                    {product.product.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    for {product.name}
                  </p>
                </div>
              ))}
              {orderProducts.length > 2 && (
                <p className="text-sm text-muted-foreground">
                  +{orderProducts.length - 2} more item
                  {orderProducts.length - 2 !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {/* Order Total */}
          <div className="flex flex-row justify-between items-center pt-2 border-t">
            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium">Total</p>
              {discountBreakdown.totalSavings > 0 && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Saved {formatCurrency(discountBreakdown.totalSavings)}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <p className="text-lg font-bold">
                {formatCurrency(discountBreakdown.discountedTotal)}
              </p>
              {discountBreakdown.totalSavings > 0 && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(discountBreakdown.originalTotal)}
                </p>
              )}
            </div>
          </div>

          {/* Action Hint */}
          <div className="flex flex-row justify-center pt-2">
            <p className="text-xs text-muted-foreground">
              Click to view full order details
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
