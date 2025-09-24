import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { HeroText } from "@/features/hero/components/hero-text";
import { ServiceDescription } from "@/features/landing/components/service-description";
import { TemplateShowcase } from "@/features/landing/components/template-showcase";
import { PricingSection } from "@/features/landing/components/pricing-section";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { TestimonialsSection } from "@/features/landing/components/testimonials-section";
import { CallToActionSection } from "@/features/landing/components/call-to-action-section";
import { Footer } from "@/features/landing/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 w-full mt-12">
      <HeroText />
      <Separator className="w-full" />
      <ServiceDescription />
      <TemplateShowcase />
      <PricingSection />
      <HowItWorks />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
