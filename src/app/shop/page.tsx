import { HeroText } from "@/features/hero/components/hero-text";
import { StripeDemo } from "@/features/payments/components/stripe-demo";
import { Separator } from "@/components/ui/separator";
import { productList } from "@/features/products/utils/product-list";
import { ProductCard } from "@/features/products/components/product-card";

export default function Shop() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 w-full mt-12">
      <HeroText title="Shop" />
      {/* <StripeDemo /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
