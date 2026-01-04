import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CallToAction() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <Container size="md">
        <div className="rounded-2xl bg-foreground text-background p-12 md:p-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Ready to Step Up Your Style?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-background/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the
            perfect blend of style and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
              View Catalog
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
