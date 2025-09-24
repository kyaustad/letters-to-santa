"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Gift, Truck } from "lucide-react";

export const PricingSection = () => {
  const features = [
    "Choose from 20+ beautiful templates",
    "Fully customizable message content",
    "Authentic North Pole, Alaska postmark",
    "High-quality premium paper",
    "Professional printing & packaging",
    "Direct delivery to recipient",
    "Tracking number provided",
    "Satisfaction guarantee",
  ];

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-script text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            One low price includes everything you need to create magical
            Christmas memories
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Main Pricing Card */}
          <Card className="relative border-2 border-primary shadow-xl">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold mb-2">
                Santa Letter Package
              </CardTitle>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-5xl font-bold text-primary">$9.89</span>
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">
                    per letter
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    All inclusive
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                Everything you need for the perfect Santa letter experience
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button size="lg" className="w-full text-lg py-6">
                  <Gift className="h-5 w-5 mr-2" />
                  Order Your Santa Letter
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Secure checkout • Instant confirmation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Value Proposition Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">
                Why Choose Our Service?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Authentic Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Real North Pole postmark makes every letter truly magical
                    and believable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Truck className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Convenient Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Letters are mailed directly to your child - no need to
                    intercept mail.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Gift className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Perfect for Gifts</h3>
                  <p className="text-sm text-muted-foreground">
                    Ideal for grandparents, aunts, uncles, and parents who want
                    to create magic.
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-primary mb-1">
                  Order by December 15th
                </p>
                <p className="text-xs text-muted-foreground">
                  For guaranteed delivery before Christmas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">No Hidden Fees</h3>
          <p className="text-muted-foreground">
            The $9.89 price includes template selection, customization,
            printing, North Pole postmark, packaging, and delivery. What you see
            is what you pay.
          </p>
        </div>
      </div>
    </section>
  );
};
