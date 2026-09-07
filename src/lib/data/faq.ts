export type Faq = { q: string; a: string };

// Shared by the home page FAQ teaser and the standalone /faq page so the
// two never drift - the teaser shows this list capped to 8, /faq shows it
// in full (currently the same 8; add more here and only /faq grows).
export const faqs: Faq[] = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Appointments are strongly recommended - each car gets undivided attention and bays are limited, so walk-ins may need to wait or be rebooked. Use the Book page or WhatsApp us to reserve a slot.",
  },
  {
    q: "How long does ceramic coating protection last?",
    a: "It depends on the coating tier and how the car is maintained afterward. We'll go through the specific warranty terms for your chosen coating when you book - ask us directly for exact coverage.",
  },
  {
    q: "Do you offer pickup and drop-off?",
    a: "Message us on WhatsApp with your location and we'll confirm whether pickup/drop-off is available for your area.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash and standard card payment are accepted in-studio. Ask us directly if you need another arrangement.",
  },
  {
    q: "Can I get a price before booking?",
    a: "Yes - package pricing is listed on the Services page, and each service page includes an estimated turnaround. For anything custom (e.g. a multi-stage correction on a heavily swirled car), tell us in the booking notes and we'll confirm a price before starting any work.",
  },
  {
    q: "What's the difference between ceramic and graphene coating?",
    a: "Both bond to the clear coat for long-term hydrophobic protection. Graphene adds better heat dissipation and slightly more flexibility, which matters most on dark-colored cars and on wraps/PPF. See the Ceramic Coating and Graphene Coating service pages for more detail.",
  },
  {
    q: "How soon can I wash my car after a coating is applied?",
    a: "Ceramic needs at least two weeks before its first wash, with the full cure taking 2-3 weeks. Graphene is quicker - no water for the first 24-48 hours, no soap for the first week, then normal washing resumes. See the Aftercare section on the Ceramic Coating and Graphene Coating service pages for the complete curing timeline and dos/don'ts.",
  },
  {
    q: "Water isn't beading on my car anymore - is the coating ruined?",
    a: "No - that's the most common sign your coating needs a maintenance refresh, not that it has failed. A wash with a pH-neutral coating soap and a coating-safe detailer usually restores it. Full troubleshooting steps are on the Ceramic Coating and Graphene Coating service pages.",
  },
];
