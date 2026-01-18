import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="pb-20 md:pb-32 bg-foreground/5">
      <Container size="md">
        <div className="text-center">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl md:text-5xl mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive updates, new arrivals, and
            special offers delivered straight to your inbox.
          </p>

          <div className="flex justify-center">
            <NewsletterForm />
          </div>

          <p className="mt-6 text-sm text-foreground/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
