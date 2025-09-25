"use client";

import { type Product } from "../utils/product-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { ProductImage } from "./product-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ProductOrderDetailsForm } from "./product-order-details-form";
import { useState } from "react";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative mt-0 pt-0">
      <CardContent className="p-0">
        <div className="">
          <ProductImage image={product.image} />

          {product.popular && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 z-10 text-base "
            >{`Popular`}</Badge>
          )}

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>

            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              {product.description}
            </p>

            <div className="flex gap-2">
              <PreviewDialog product={product}>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </PreviewDialog>
              <AddToCartDialog product={product}>
                <Button size="sm" className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </AddToCartDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function PreviewDialog({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl px-4">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <Carousel className="w-full h-full relative">
          <CarouselContent className="w-full h-full ">
            {product.previews.map((preview) => (
              <CarouselItem key={crypto.randomUUID()}>
                <ProductImage image={preview} width={600} height={800} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselIndicator className="absolute -bottom-4 left-1/2 -translate-x-1/2" />
          <CarouselPrevious variant="default" className="absolute left-0" />
          <CarouselNext variant="default" className="absolute right-0" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}

function AddToCartDialog({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-row items-center gap-4">
            <ProductImage
              image={product.image}
              width={300}
              height={400}
              className="max-w-24 max-h-24 rounded-md"
            />

            <div className="flex flex-col gap-2">
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>{product.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ProductOrderDetailsForm
            product={product}
            submitText="Add to Cart"
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
