import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createNewsletterSubscriber } from "@/lib/api/pos";

const subscribeSchema = z.object({
  email: z.string().email("Enter a valid email"),
  company: z.string().max(0).optional(), // honeypot
});

type SubscribeValues = z.infer<typeof subscribeSchema>;

export function BlogSubscribe() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<SubscribeValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "", company: "" },
  });

  async function onSubmit(values: SubscribeValues) {
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

  return (
    <div className="rounded-3xl glass-strong p-10">
      {status === "success" ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              You're subscribed.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Look out for detailing tips and offers in your inbox.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <div className="eyebrow mb-2 justify-center sm:justify-start">
              <Mail className="h-3.5 w-3.5 text-primary" /> Enjoyed this post?
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Get more from the studio
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Detailing tips, coating breakdowns and offers, occasionally. No spam.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-sm flex-none flex-col gap-3"
            noValidate
          >
            <label
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              Company
              <input type="text" tabIndex={-1} autoComplete="off" {...form.register("company")} />
            </label>

            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-11"
                {...form.register("email")}
              />
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="h-11 flex-none rounded-full px-6 text-xs font-semibold uppercase tracking-wider"
              >
                {status === "submitting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {form.formState.errors.email && (
              <p className="text-left text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
            {status === "error" && (
              <p className="text-left text-xs text-destructive">{errorMessage}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
