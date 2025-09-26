"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/custom/phone-input";
import { useEffect, useState } from "react";

export const checkoutFormSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.email("Invalid email address"),
  customerPhone: z.string().min(1, "Customer phone is required"),
});

export const CheckoutForm = ({
  children,
  onSuccess,
  className,
}: {
  children: React.ReactNode;
  onSuccess?: () => void;
  className?: string;
}) => {
  const [checkoutData, setCheckoutData] = useState<z.infer<
    typeof checkoutFormSchema
  > | null>(null);
  useEffect(() => {
    const checkoutData = localStorage.getItem("checkoutData");
    const checkoutDataObject = checkoutData ? JSON.parse(checkoutData) : null;
    setCheckoutData(checkoutDataObject);
  }, []);

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: checkoutData?.customerName || "",
      customerEmail: checkoutData?.customerEmail || "",
      customerPhone: checkoutData?.customerPhone || "",
    },
  });

  useEffect(() => {
    if (checkoutData) {
      form.setValue("customerName", checkoutData.customerName);
      form.setValue("customerEmail", checkoutData.customerEmail);
      form.setValue("customerPhone", checkoutData.customerPhone);
    }
  }, [checkoutData]);

  const onSubmit = (data: z.infer<typeof checkoutFormSchema>) => {
    console.log("checkout form data", data);
    localStorage.setItem("checkoutData", JSON.stringify(data));
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormDescription>{`This should be your name as it appears on your credit card. Used for order updates.`}</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormDescription>{`This should be your email address. Used for order updates.`}</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Phone</FormLabel>
              <FormDescription>{`This should be your phone number. Used for order updates.`}</FormDescription>
              <FormControl>
                <PhoneInput
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};
