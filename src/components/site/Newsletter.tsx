import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createNewsletterSubscriber } from "@/lib/api/os";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
  company: z.string().max(0).optional(), // honeypot
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", company: "" },
  });

  async function onSubmit(values: NewsletterValues) {
    if (values.company) return; // honeypot tripped

    setStatus("submitting");
    const result = await createNewsletterSubscriber({
      email: values.email,
      company: values.company,
    });

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setErrorMessage(result.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-5 max-w-sm">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
          Stay in the loop
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4 flex-none" /> You're subscribed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 max-w-sm" noValidate>
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
        Stay in the loop
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Offers and detailing tips, occasionally. No spam.
      </p>

      <div className="mt-3 flex gap-2">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="newsletter-company">Company</label>
          <input
            id="newsletter-company"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("company")}
          />
        </div>
        <Input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="h-10"
          {...form.register("email")}
        />
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-10 flex-none rounded-full px-5 text-xs font-semibold uppercase tracking-wider"
        >
          {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
        </Button>
      </div>

      {form.formState.errors.email && (
        <p className="mt-2 text-xs text-destructive">{form.formState.errors.email.message}</p>
      )}
      {status === "error" && <p className="mt-2 text-xs text-destructive">{errorMessage}</p>}
    </form>
  );
}
