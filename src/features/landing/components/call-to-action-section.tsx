"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Clock, Shield, Heart, ArrowRight, Star } from "lucide-react";

export const CallToActionSection = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary text-white px-4 py-2">
            Limited Time Offer
          </Badge>
          <h2 className="text-5xl text-primary mb-6">
            Create Magic This Christmas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {`Don't let another Christmas pass without creating unforgettable
            memories. Order your Santa letter today and watch faces
            light up with wonder.`}
          </p>
        </div>

        {/* <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-primary shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-primary mb-2">
                  $9.89
                </div>
                <p className="text-muted-foreground">
                  All inclusive • No hidden fees
                </p>
              </div>

              <Button size="lg" className="w-full text-xl py-6 mb-4">
                <Gift className="h-6 w-6 mr-3" />
                Order Your Santa Letter Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <p className="text-sm text-muted-foreground mb-4">
                Secure checkout • Instant confirmation • Track your order
              </p>

              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Fast Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span>Made with Love</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="p-3 bg-red-100 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold text-red-800 mb-2">
                  Order Soon!
                </h3>
                <p className="text-red-700">
                  Christmas delivery cutoff is approaching
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">
                    Order by Dec 15th for guaranteed Christmas delivery
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">
                    Processing takes 1-2 business days
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">
                    Delivery takes 3-7 business days
                  </span>
                </div>
              </div>

              <div className="bg-white/70 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  Don't miss out on creating magic this year!
                </p>
                <p className="text-xs text-gray-600">
                  Join thousands of families who trust us with their Christmas
                  memories
                </p>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Additional Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6">
            <CardContent>
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                {`High-quality materials and professional printing for lasting
                memories`}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                {`Each letter is carefully crafted to create the perfect magical
                experience`}
              </p>
            </CardContent>
          </Card>

          {/* <Card className="text-center p-6">
            <CardContent>
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Satisfaction Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Not happy? We'll make it right or refund your money, no
                questions asked
              </p>
            </CardContent>
          </Card> */}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            {`Ready to create holiday magic? Christmas wonder awaits.`}
          </p>
          <Button size="lg" variant="default" className="text-lg px-8 py-3">
            Start Creating Magic
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
