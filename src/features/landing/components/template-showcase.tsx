"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { productList } from "@/features/products/utils/product-list";
import { ProductCard } from "@/features/products/components/product-card";

export const TemplateShowcase = () => {
  return (
    <section className="w-full py-12 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl  text-primary mb-4">
            {`Choose Your Perfect Template`}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {`Select from our beautiful collection of letter and card templates,
            each designed to create magical Christmas memories.`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {productList.map((template) => (
            <ProductCard key={template.id} product={template} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {`All templates can be fully customized with your desired name, age, and personal message from Santa.`}
          </p>
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};
