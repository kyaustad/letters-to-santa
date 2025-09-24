"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Heart, Shield, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-muted/30 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl text-primary">{`Letters From Santa`}</h3>
            <p className="text-sm text-muted-foreground">
              {`Creating magical Christmas memories since 2025.`}
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                {`Secure`}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Heart className="h-3 w-3 mr-1" />
                {`Trusted`}
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{`Quick Links`}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {`Order Now`}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {`Templates`}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {`How It Works`}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {`FAQ`}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {`Contact Us`}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          {/* <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">{`Contact Us`}</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{`support@lettersfromsanta.com`}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{`North Pole, Alaska`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{`Mon-Fri 9AM-6PM EST`}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {` © 2025 Letters From Santa. All rights reserved.`}
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>{`Made with ❤️ for Christmas magic`}</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>{`SSL Secured`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-600" />
              <span>{`100% Satisfaction`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{`Fast Processing`}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{`Real North Pole Postmark`}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
