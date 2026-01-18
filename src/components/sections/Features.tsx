import Container from "@/components/ui/Container";
import { Sparkles, Heart, Leaf, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Handcrafted Excellence",
    description:
      "Every pair is meticulously crafted by skilled artisans using time-honored techniques passed down through generations.",
  },
  {
    icon: Heart,
    title: "Unmatched Comfort",
    description:
      "Premium materials and ergonomic design ensure all-day comfort without compromising on style or durability.",
  },
  {
    icon: Leaf,
    title: "Sustainably Made",
    description:
      "Committed to ethical production practices and eco-friendly materials, because fashion should respect the planet.",
  },
  {
    icon: Shield,
    title: "Lifetime Quality",
    description:
      "Built to last with exceptional materials and construction. We stand behind every pair with our satisfaction guarantee.",
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <Container size="lg">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl md:text-5xl mb-4">
            Why Choose Harriet Osen
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Exceptional footwear that exceeds expectations in every detail
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg transition-transform hover:scale-105"
              >
                <div className="mb-4 rounded-full bg-foreground/5 p-4">
                  <Icon className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
