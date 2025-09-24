"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MousePointer, Edit3, Printer, Mail, Truck, Clock } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: MousePointer,
      title: "Choose Your Template",
      description:
        "Browse our collection of beautiful letter and card designs. Select the perfect template that matches your child's personality.",
      details: "7 templates available",
    },
    {
      step: 2,
      icon: Edit3,
      title: "Customize Your Message",
      description:
        "Add your any special details. Write a personalized message from Santa that will make their eyes light up.",
      details: "Fully customizable content",
    },
    {
      step: 3,
      icon: Printer,
      title: "We Print & Prepare",
      description:
        "We print your letter on premium paper, adds the authentic North Pole postmark, and carefully packages it for mailing.",
      details: "High-quality materials",
    },
    {
      step: 4,
      icon: Mail,
      title: "North Pole Postmark",
      description:
        "Your letter receives the official North Pole, Alaska postmark, making it completely authentic and magical.",
      details: "Real North Pole postmark",
    },
    {
      step: 5,
      icon: Truck,
      title: "Direct Delivery",
      description:
        "We mail your letter directly to your address. You'll receive an email when the letter is stamped and mailed.",
      details: "Shipped via USPS",
    },
  ];

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-primary mb-4">{`How It Works`}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {`Creating magical Santa letters is simple and stress-free. Follow
            these easy steps to bring Christmas joy.`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={step.step}
              className="relative hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="p-4 bg-primary/10 rounded-full mx-auto w-fit">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-white">
                    {step.step}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>

                <p className="text-sm text-muted-foreground mb-3">
                  {step.description}
                </p>

                <Badge variant="outline" className="text-xs">
                  {step.details}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-muted/50 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{`Order Processing`}</p>
              <p className="text-xs text-muted-foreground">{`1-2 business days`}</p>
            </div>
            <div className="text-center">
              <Printer className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="text-sm font-medium">{`Printing & Postmark`}</p>
              <p className="text-xs text-muted-foreground">{`2-3 business days`}</p>
            </div>
            <div className="text-center">
              <Truck className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-medium">{`Delivery`}</p>
              <p className="text-xs text-muted-foreground">{`USPS Depending on location`}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              <strong>{`Total time:`}</strong>{" "}
              {`6-12 business days from order to
              delivery `}
            </p>
            <p className="text-xs text-primary mt-1">
              {`Order by December 1st for Christmas delivery`}
            </p>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">{`Have Questions?`}</h3>
          <p className="text-muted-foreground mb-4">
            {`Check out our frequently asked questions or contact our support
            team.`}
          </p>
          <div className="flex gap-4 justify-center flex-col md:flex-row items-center">
            <Badge variant="outline" className="px-4 py-2">
              {`Can I order multiple letters?`}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {`When should I order?`}
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              {`Is the postmark real?`}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};
