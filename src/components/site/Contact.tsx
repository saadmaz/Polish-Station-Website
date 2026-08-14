import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { submitToWeb3Forms } from "@/lib/forms/web3forms";

const inquirySchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(5, "Tell us a little about your question"),
  company: z.string().max(0).optional(), // honeypot
});

type InquiryValues = z.infer<typeof inquirySchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: InquiryValues) {
    if (values.company) return; // honeypot tripped

    setStatus("submitting");
    const result = await submitToWeb3Forms({
      subject: "New inquiry - Polish Station website",
      from_name: "Polish Station website",
      name: values.name,
      email: values.email,
      message: values.message,
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
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Visit the Studio
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Get in <span className="text-gradient-primary">touch.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                icon: MapPin,
                label: "Location",
                value: "22C, Saranankara Road, Dehiwala.",
                href: "https://www.google.com/maps/search/?api=1&query=22C+Saranankara+Road+Dehiwala",
              },
              { icon: Phone, label: "Call", value: "+94 74 100 4296", href: "tel:+94741004296" },
              {
                icon: Mail,
                label: "Email",
                value: "studio@polishstation.com",
                href: "mailto:studio@polishstation.com",
              },
              { icon: Clock, label: "Hours", value: "Mon–Sat · 8:00 - 19:00", href: undefined },
            ].map((i) => {
              const Tag = i.href ? "a" : "div";
              return (
                <Tag
                  key={i.label}
                  {...(i.href
                    ? { href: i.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-start gap-4 rounded-2xl glass p-5 transition-colors hover:bg-primary/5"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/15 text-primary">
                    <i.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {i.label}
                    </div>
                    <div className="mt-1 text-sm font-medium">{i.value}</div>
                  </div>
                </Tag>
              );
            })}
          </div>

          <div className="rounded-3xl glass-strong p-8">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <p className="mt-4 font-display text-lg font-bold uppercase">Message sent.</p>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you shortly.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      tabIndex={-1}
                      autoComplete="off"
                      {...form.register("company")}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help?" rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {status === "error" && <p className="text-sm text-destructive">{errorMessage}</p>}

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-full py-6 text-sm font-semibold uppercase tracking-wider shadow-glow-primary"
                  >
                    {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* Google Maps: 22 Sri Saranankara Rd, Dehiwala-Mount Lavinia */}
        <div className="mt-6 h-80 overflow-hidden rounded-3xl border border-border">
          <iframe
            title="Polish Station location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.57248777915166!2d79.86722355195928!3d6.871447290620591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bb139e473a9%3A0xbddd057f638bc802!2s22%20Sri%20Saranankara%20Rd%2C%20Dehiwala-Mount%20Lavinia!5e0!3m2!1sen!2slk!4v1786726646611!5m2!1sen!2slk"
            className="h-full w-full"
            style={{ border: 0, filter: "grayscale(1) invert(0.92) hue-rotate(180deg)" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
