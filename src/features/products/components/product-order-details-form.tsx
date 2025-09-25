"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Product,
  productList,
  InProgressProduct,
  DefaultMessage,
  InProgressProductWithProduct,
} from "../utils/product-list";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { State, StateSelection } from "@/components/custom/state-selection";
import { Loader2, PencilIcon, ShoppingCartIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCart } from "@/features/cart/components/cart-context";
import { toast } from "sonner";

const productOrderDetailsFormSchema = z.object({
  id: z.string(),
  productId: z.number(),
  name: z.string().min(1, "Name is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.number().min(5, "Zip code is required and must be 5 digits"),
  country: z.string().min(1, "Country is required"),
  message: z.string().min(1, "Message is required"),
});

export const ProductOrderDetailsForm = ({
  product,
  submitText,
  onSuccess,
}: {
  product: Product;
  submitText: string;
  onSuccess: () => void;
}) => {
  const form = useForm<z.infer<typeof productOrderDetailsFormSchema>>({
    resolver: zodResolver(productOrderDetailsFormSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      productId: product.id,
      name: "",
      street: "",
      city: "",
      state: "AK",
      zip: 12345,
      country: "USA",
      message: DefaultMessage,
    },
  });

  const { addToCart } = useCart();

  const onSubmit = async (
    data: z.infer<typeof productOrderDetailsFormSchema>,
  ) => {
    console.log(data);
    try {
      const payload = {
        ...data,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip.toString(),
          country: data.country,
        },
      };
      toast.promise(addToCart(payload), {
        loading: "Adding to cart...",
        success: (data) => {
          onSuccess();

          return "Added to cart!";
        },
        error: "Failed to add to cart",
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={cn(
                    "resize-none h-32 overflow-y-auto",
                    field.value === DefaultMessage
                      ? "text-muted-foreground"
                      : "",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex flex-col gap-4">
          <FormLabel className="text-lg font-medium">
            Delivery Address
          </FormLabel>
        </div>

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="street-address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="city" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 items-start w-full">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <StateSelection
                    {...field}
                    value={field.value as State}
                    autoComplete="state"
                    contentClassName="max-h-64 overflow-y-auto"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input
                    maxLength={5}
                    minLength={5}
                    type="number"
                    pattern="[0-9]*"
                    step={1}
                    inputMode="numeric"
                    value={field.value}
                    autoComplete="postal-code"
                    onChange={(e) => {
                      if (e.target.value.length <= 5) {
                        field.onChange(Number(e.target.value));
                      } else {
                        const value = e.target.value.slice(0, 5);
                        field.onChange(Number(value));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <p className="text-xs text-muted-foreground">{`Only USA is supported`}</p>
              <FormControl>
                <Input {...field} value="USA" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {`Adding to Cart...`}
            </>
          ) : (
            <>
              <ShoppingCartIcon className="size-4" />
              {submitText}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export const EditProductOrderDetailsForm = ({
  product,
  submitText,
  onSuccess,
}: {
  product: InProgressProductWithProduct;
  submitText: string;
  onSuccess: () => void;
}) => {
  const form = useForm<z.infer<typeof productOrderDetailsFormSchema>>({
    resolver: zodResolver(productOrderDetailsFormSchema),
    defaultValues: {
      id: product.id,
      productId: product.product.id,
      name: product.name,
      street: product.address.street,
      city: product.address.city,
      state: product.address.state,
      zip: Number(product.address.zip),
      country: product.address.country,
      message: product.message,
    },
  });

  const { updateCart } = useCart();

  const onSubmit = async (
    data: z.infer<typeof productOrderDetailsFormSchema>,
  ) => {
    console.log(data);
    try {
      const payload = {
        ...data,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip.toString(),
          country: data.country,
        },
      };
      const success = updateCart(payload);
      if (success) {
        onSuccess();
        toast.success("Cart Updated!");
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={cn(
                    "resize-none h-32 overflow-y-auto",
                    field.value === DefaultMessage
                      ? "text-muted-foreground"
                      : "",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex flex-col gap-4">
          <FormLabel className="text-lg font-medium">
            Delivery Address
          </FormLabel>
        </div>

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="street-address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="city" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 items-start w-full">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <StateSelection
                    {...field}
                    value={field.value as State}
                    autoComplete="state"
                    contentClassName="max-h-64 overflow-y-auto"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input
                    maxLength={5}
                    minLength={5}
                    type="number"
                    pattern="[0-9]*"
                    step={1}
                    inputMode="numeric"
                    value={field.value}
                    autoComplete="postal-code"
                    onChange={(e) => {
                      if (e.target.value.length <= 5) {
                        field.onChange(Number(e.target.value));
                      } else {
                        const value = e.target.value.slice(0, 5);
                        field.onChange(Number(value));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <p className="text-xs text-muted-foreground">{`Only USA is supported`}</p>
              <FormControl>
                <Input {...field} value="USA" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {`Updating Cart...`}
            </>
          ) : (
            <>
              <PencilIcon className="size-4" />
              {submitText}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
