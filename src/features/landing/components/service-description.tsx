"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Heart, Star } from "lucide-react";

export const ServiceDescription = () => {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">
            {`Magical Letters from the North Pole`}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {`Create unforgettable Christmas memories with personalized letters
            from Santa, postmarked from North Pole, Alaska and delivered
            directly to your loved ones mailbox.`}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center space-y-4 w-full p-0">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">North Pole Postmark</h3>
              <p className="text-sm text-muted-foreground w-full">
                {`Authentic "North Pole, Alaska" postmark makes every letter truly
                magical`}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center space-y-4 w-full p-0">
              <div className="p-3 bg-secondary/10 rounded-full">
                <Mail className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">{`Custom Messages`}</h3>
              <p className="text-sm text-muted-foreground w-full">
                {`Personalize each letter with your own message and details`}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center space-y-4 w-full p-0">
              <div className="p-3 bg-accent/10 rounded-full">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">{`Beautiful Templates`}</h3>
              <p className="text-sm text-muted-foreground w-full">
                {`Choose from our collection of festive letter and card design templates`}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center space-y-4 w-full p-0">
              <div className="p-3 bg-primary/10 rounded-full">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{`Premium Quality`}</h3>
              <p className="text-sm text-muted-foreground w-full">
                {`High-quality paper, professional printing, and careful packaging`}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 text-center">
          {/* <Badge
            variant="secondary"
            className="mb-4 text-lg px-4 py-2 text-wrap w-fit"
          >
            Perfect for Grandparents & Parents
          </Badge> */}
          {/* recreate badge as a div with the same style */}
          <div className="bg-secondary/85 rounded-lg p-4 text-center my-4 text-lg max-w-lg mx-auto">
            <p>{`Perfect for Grandparents & Parents`}</p>
          </div>
          <h3 className="text-2xl font-semibold mb-4">
            {`Create Magic This Christmas`}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {`Whether you're a grandparent wanting to surprise your grandchild or
            a parent looking to make Christmas extra special, our Santa letters
            create lasting memories that your family will treasure for years to
            come.`}
          </p>
        </div>
      </div>
    </section>
  );
};
