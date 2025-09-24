"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Grandmother",
      location: "Texas",
      rating: 5,
      text: "My granddaughter was absolutely thrilled when she received her letter from Santa! The North Pole postmark made it so authentic. She still talks about it months later.",
      avatar: "SJ",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Father",
      location: "California",
      rating: 5,
      text: "Perfect for busy parents who want to create magic without the stress. The customization options let me mention specific things my son did this year. Highly recommend!",
      avatar: "MC",
      verified: true,
    },
    {
      id: 3,
      name: "Linda Rodriguez",
      role: "Aunt",
      location: "Florida",
      rating: 5,
      text: "I ordered letters for all three of my nieces and nephews. The templates were beautiful and the personalization was so easy. The kids were over the moon!",
      avatar: "LR",
      verified: true,
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Grandfather",
      location: "New York",
      rating: 5,
      text: "As a grandfather living far away, this service lets me be part of my grandson's Christmas magic. The quality exceeded my expectations.",
      avatar: "DT",
      verified: true,
    },
    {
      id: 5,
      name: "Emily Davis",
      role: "Mother",
      location: "Washington",
      rating: 5,
      text: "My daughter's face when she saw the North Pole postmark was priceless! The letter was beautifully written and arrived right on time. Worth every penny.",
      avatar: "ED",
      verified: true,
    },
    {
      id: 6,
      name: "Robert Wilson",
      role: "Uncle",
      location: "Illinois",
      rating: 5,
      text: "I've been using this service for three years now. The consistency in quality and the authentic feel never disappoints. My nephew looks forward to it every year.",
      avatar: "RW",
      verified: true,
    },
  ];

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-script text-primary mb-4">
            {`What Our Customers Say`}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {`Join thousands of happy families who have created magical Christmas
            memories with our Santa letter service.`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <Quote className="h-6 w-6 text-primary/30 flex-shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground italic">
                    {`${testimonial.text}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">
                        {testimonial.name}
                      </p>
                      {testimonial.verified && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-6">
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {`  10,000+`}
              </div>
              <p className="text-sm text-muted-foreground">{`Happy Families`}</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <p className="text-sm text-muted-foreground">{`Average Rating`}</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-sm text-muted-foreground">{`Satisfaction Rate`}</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {`5 Years`}
              </div>
              <p className="text-sm text-muted-foreground">{`Creating Magic`}</p>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {`Trusted by Families Nationwide`}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {/* <span>✓ Secure Payment Processing</span>
            <span>✓ Privacy Protected</span>
            <span>✓ Money-Back Guarantee</span>
            <span>✓ Customer Support</span> */}
          </div>
        </div>
      </div>
    </section>
  );
};
