"use client";

import { useCart } from "./cart-context";
import { Button } from "@/components/ui/button";
import {
  PenIcon,
  ShoppingCartIcon,
  SquarePenIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InProgressProduct,
  InProgressProductWithProduct,
} from "@/features/products/utils/product-list";
import { ProductImage } from "@/features/products/components/product-image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditProductOrderDetailsForm } from "@/features/products/components/product-order-details-form";
import { useIsMobile } from "@/hooks/use-mobile";

export const CartButton = () => {
  const { cart, cartWithProducts, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  if (!cart) return null;
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="accent"
          size="lg"
          className={cn(
            "fixed z-50 aspect-square min-w-12 min-h-12 bottom-8 right-8 shadow-xl",
            isMobile && "bottom-2 right-2",
          )}
        >
          <ShoppingCartIcon className="size-6  dark:text-gray-950" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 max-h-152 overflow-y-auto border-4 shadow-xl bg-popover/90 backdrop-blur-sm p-2 min-h-152 flex flex-col"
        align="end"
      >
        <div className="flex flex-col flex-1 gap-2 h-full overflow-y-auto scrollbar-hide">
          {cart &&
            cartWithProducts &&
            cartWithProducts.products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
        </div>
        <div className="flex flex-col gap-2 sticky bottom-0">
          <div className="flex flex-col gap-0 items-end w-full justify-between sticky bottom-0 border-t border-border pt-2 ">
            <p className="text-lg text-foreground  text-right w-full">{`Total: $${cartWithProducts?.total.toFixed(2)}`}</p>
            <p className="text-xs text-muted-foreground  text-right w-full">{`Items: ${cartWithProducts?.products.length}`}</p>
            <p className="text-xs text-muted-foreground  text-right w-full">{`Bundle Discounts Applied at Checkout`}</p>
          </div>
          <div className="flex flex-row gap-2 items-center w-full justify-between  pt-2 ">
            <Button variant="destructive" size="lg" onClick={clearCart}>
              <TrashIcon className="size-4" />
              {`Clear Cart`}
            </Button>
            <Button variant="secondary" size="lg">
              <ShoppingCartIcon className="size-4" />
              {`Checkout`}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

function CartItem({ product }: { product: InProgressProductWithProduct }) {
  return (
    <div className="bg-card p-2 rounded-md border border-border flex flex-row gap-2">
      <div className="flex flex-col gap-2 justify-between items-center w-full">
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <p className="text-lg font-semibold">{product.product.name}</p>
          <p className="text-sm text-muted-foreground">
            {`$${product.product.price.toFixed(2)}`}
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center w-full justify-between">
          <div className="flex flex-col gap-0 items-start">
            <p className="text-sm ">{`Recipient: `}</p>
            <p className="text-sm text-muted-foreground">{product.name}</p>
          </div>
          <div className="flex flex-col gap-1 items-end">
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

function ConfirmRemoveAlert({
  product,
  children,
}: {
  product: InProgressProductWithProduct;
  children: React.ReactNode;
}) {
  const { removeFromCart } = useCart();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90vh] overflow-y-auto scrollbar-hide">
        <AlertDialogHeader>
          <AlertDialogTitle>{`Remove ${product.product.name}`}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{`Are you sure you want to remove ${product.product.name} from your cart?`}</AlertDialogDescription>
        <div className="flex flex-col gap-2 w-full items-center h-full">
          <div className="w-full h-full mx-auto">
            <ProductImage
              image={product.product.image}
              width={500}
              height={700}
              className="max-h-64 object-contain rounded-md mx-auto"
              imageClassName=" object-contain"
            />
          </div>
          <Separator />
          <div className="flex flex-col md:flex-row w-full items-start justify-between p-2 border border-border rounded-md">
            <p className="text-base text-muted-foreground">{`Recipient Name: `}</p>
            <p className="text-base ">{product.name}</p>
          </div>
          <div className="flex flex-col md:flex-row w-full items-start justify-between p-2 border border-border rounded-md">
            <p className="text-base text-muted-foreground">{`Message: `}</p>
            <p className="text-base ">
              {product.message.length > 100
                ? product.message.slice(0, 35) + "..."
                : product.message}
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full items-start justify-between p-2 border border-border rounded-md">
            <p className="text-base text-muted-foreground">{`Address: `}</p>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-base ">{`${product.address.street} ${product.address.city},`}</p>
              <p className="text-base ">{`${product.address.state} ${product.address.zip} ${product.address.country}`}</p>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>{`Cancel`}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              removeFromCart({
                id: product.id,
                productId: product.product.id,
                name: product.name,
                address: product.address,
                message: product.message,
              })
            }
          >{`Remove`}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditItemDialog({
  product,
  children,
}: {
  product: InProgressProductWithProduct;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Edit ${product.product.name}`}</DialogTitle>
          <DialogDescription>{`Edit the details of ${product.product.name} in your cart`}</DialogDescription>
        </DialogHeader>
        <EditProductOrderDetailsForm
          product={product}
          submitText="Update"
          onSuccess={() => {
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
