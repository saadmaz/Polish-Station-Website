import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { services, getServiceBySlug } from "@/lib/data/services";
import { packages } from "@/lib/data/pricing";
import { createBooking } from "@/lib/api/os";

const TIME_WINDOWS = [
  "8:00 AM - 11:00 AM",
  "11:00 AM - 2:00 PM",
  "2:00 PM - 5:00 PM",
  "5:00 PM - 7:00 PM",
];

// The OS's /api/public/booking only accepts these exact strings in
// `services` (case-sensitive) - the first 8 happen to already match this
// site's service titles verbatim, "Other" doesn't correspond to a real
// service and needs its own free-text field (`otherService`) when picked.
const OTHER_SERVICE = "Other";
const SERVICE_OPTIONS = [...services.map((s) => s.title), OTHER_SERVICE];

const bookingSchema = z
  .object({
    name: z.string().min(2, "Enter your name").max(100, "Name is too long"),
    phone: z.string().min(6, "Enter a valid phone number").max(24, "Phone number is too long"),
    email: z.union([z.string().email("Enter a valid email"), z.literal("")]),
    vehicle: z.string().min(2, "Tell us the make & model"),
    services: z.array(z.string()).min(1, "Select at least one service"),
    otherService: z.string(),
    preferredDate: z.string().min(1, "Pick a preferred date"),
    timeWindow: z.string().min(1, "Pick a time window"),
    notes: z.string(),
    company: z.string().max(0).optional(), // honeypot - real users never fill this
  })
  .refine((data) => !data.services.includes(OTHER_SERVICE) || data.otherService.trim().length > 0, {
    message: "Tell us what the other service is",
    path: ["otherService"],
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

export const Route = createFileRoute("/_layout/book")({
  validateSearch: z.object({
    service: z.string().optional(),
    package: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Book an Appointment - Polish Station" },
      {
        name: "description",
        content:
          "Request a detailing appointment at Polish Station, Dehiwala. Tell us your car and preferred time and we'll confirm your slot.",
      },
      { property: "og:title", content: "Book an Appointment - Polish Station" },
      {
        property: "og:description",
        content: "Request a detailing appointment at Polish Station, Dehiwala.",
      },
      { property: "og:url", content: "https://www.polishstation.lk/book" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/book" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.polishstation.lk/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Book",
              item: "https://www.polishstation.lk/book",
            },
          ],
        }),
      },
    ],
  }),
  component: BookPage,
});

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function BookPage() {
  const { service, package: packageSlug } = Route.useSearch();
  const preselectedPackage = packages.find((p) => p.slug === packageSlug);
  const preselectedSlugs = preselectedPackage
    ? preselectedPackage.includedServiceSlugs
    : service
      ? [service]
      : [];
  const initialServices = preselectedSlugs
    .map((slug) => getServiceBySlug(slug)?.title)
    .filter((title): title is string => Boolean(title));

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicle: "",
      services: initialServices,
      otherService: "",
      preferredDate: "",
      timeWindow: "",
      notes: packageSlug
        ? `Interested in the ${preselectedPackage?.name ?? packageSlug} package.`
        : "",
      company: "",
    },
  });

  async function onSubmit(values: BookingFormValues) {
    if (values.company) return; // honeypot tripped - silently drop

    setStatus("submitting");

    const serviceLabel = values.services.includes(OTHER_SERVICE)
      ? [...values.services.filter((s) => s !== OTHER_SERVICE), values.otherService].join(", ")
      : values.services.join(", ");

    const summary =
      `New booking request from ${values.name}\n` +
      `Phone: ${values.phone}\n` +
      (values.email ? `Email: ${values.email}\n` : "") +
      `Vehicle: ${values.vehicle}\n` +
      `Services: ${serviceLabel}\n` +
      `Preferred: ${values.preferredDate} (${values.timeWindow})\n` +
      (values.notes ? `Notes: ${values.notes}` : "");

    const waMessage = encodeURIComponent(summary);
    setWhatsappHref(`https://wa.me/94711885252?text=${waMessage}`);

    // The backend has no dedicated field for a preferred time window, so it
    // rides along in notes instead of being dropped from the request.
    const notesWithTimeWindow = `${values.notes ? `${values.notes}\n\n` : ""}Preferred time: ${values.timeWindow}`;

    const result = await createBooking({
      name: values.name,
      phone: values.phone,
      email: values.email,
      vehicle: values.vehicle,
      services: values.services,
      otherService: values.services.includes(OTHER_SERVICE) ? values.otherService : "",
      preferredDate: values.preferredDate,
      notes: notesWithTimeWindow,
      company: values.company ?? "",
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setErrorMessage(result.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="section-padding relative pt-40">
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold uppercase">Request sent.</h1>
          <p className="mt-4 text-muted-foreground">
            We've received your booking request and will confirm your slot by phone or email within
            24 hours.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
          >
            Confirm instantly via WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative pt-32">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal variant="up">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Book an Appointment
          </div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-5xl">
            Reserve your <span className="text-gradient-primary">slot.</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Tell us about your car and when works for you - we'll confirm the appointment directly.
          </p>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-10 space-y-6 rounded-3xl glass-strong p-8"
            >
              {/* Honeypot - hidden via CSS positioning (not display:none, which
                  some bots specifically skip fields hidden that way), never
                  reachable by Tab. Real visitors never see or fill this. */}
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

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="07X XXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle make & model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Toyota Prius 2019" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <FormLabel>Services</FormLabel>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SERVICE_OPTIONS.map((title) => (
                        <FormField
                          key={title}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            const checked = field.value?.includes(title);
                            return (
                              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-sm">
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(v) => {
                                    if (v) field.onChange([...(field.value ?? []), title]);
                                    else
                                      field.onChange(
                                        (field.value ?? []).filter((t) => t !== title),
                                      );
                                  }}
                                />
                                {title}
                              </label>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("services")?.includes(OTHER_SERVICE) && (
                <FormField
                  control={form.control}
                  name="otherService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us the other service</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Pet hair removal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          min={todayIso()}
                          placeholder="Pick a date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeWindow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred time</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a window" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TIME_WINDOWS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Anything else we should know?" {...field} />
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
                Request Appointment
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Prefer WhatsApp?{" "}
                <a
                  href="https://wa.me/94711885252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Message us directly
                </a>
                .
              </p>
            </form>
          </Form>
        </Reveal>
      </div>
    </section>
  );
}
