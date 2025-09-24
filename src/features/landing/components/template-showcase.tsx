"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

export const TemplateShowcase = () => {
  const templates = [
    {
      id: 1,
      name: "Classic Santa Letter",
      description: "Traditional red and green design with Santa's signature",
      image: "/api/placeholder/300/400",
      category: "Letter",
      popular: true,
    },
    {
      id: 2,
      name: "Winter Wonderland Card",
      description: "Snowy scene with reindeer and Christmas trees",
      image: "/api/placeholder/300/400",
      category: "Card",
      popular: false,
    },
    {
      id: 3,
      name: "Elf Workshop Letter",
      description: "Fun design featuring Santa's busy workshop",
      image: "/api/placeholder/300/400",
      category: "Letter",
      popular: false,
    },
    {
      id: 4,
      name: "North Pole Postcard",
      description: "Vintage-style postcard from the North Pole",
      image: "/api/placeholder/300/400",
      category: "Card",
      popular: true,
    },
    {
      id: 5,
      name: "Naughty or Nice Certificate",
      description: "Official certificate with personalized details",
      image: "/api/placeholder/300/400",
      category: "Certificate",
      popular: false,
    },
    {
      id: 6,
      name: "Christmas Magic Letter",
      description: "Sparkly design with magical Christmas elements",
      image: "/api/placeholder/300/400",
      category: "Letter",
      popular: false,
    },
  ];

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
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🎄</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Preview Available
                      </p>
                    </div>
                  </div>

                  {template.popular && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2  "
                    >{`Popular`}</Badge>
                  )}

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1">
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {`All templates can be fully customized with your child's name, age,
            achievements, and personal message from Santa.`}
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
