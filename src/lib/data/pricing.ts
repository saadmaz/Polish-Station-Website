// TODO(pricing): every priceLkr / timeEstimate below is a placeholder.
// Replace with real figures before launch - do not display these to customers as-is.

export type Package = {
  slug: string;
  name: string;
  desc: string;
  /** Price in LKR. `null` means "price not yet supplied" - render as "Contact for pricing". */
  priceLkr: number | null;
  timeEstimate: string;
  popular?: boolean;
  /** Slugs from src/lib/data/services.ts bundled into this package. */
  includedServiceSlugs: string[];
  features: string[];
};

export const packages: Package[] = [
  {
    slug: "basic-detail",
    name: "Basic Detail",
    desc: "Essential refresh for daily drivers.",
    priceLkr: null,
    timeEstimate: "TODO(pricing): confirm turnaround",
    includedServiceSlugs: ["exterior-detailing", "interior-detailing"],
    features: [
      "Exterior hand wash",
      "Wheel & tire dressing",
      "Interior vacuum",
      "Window cleaning",
      "Tire shine",
    ],
  },
  {
    slug: "premium-detail",
    name: "Premium Detail",
    desc: "Deep care for enthusiasts.",
    priceLkr: null,
    timeEstimate: "TODO(pricing): confirm turnaround",
    popular: true,
    includedServiceSlugs: [
      "exterior-detailing",
      "cut-and-polish",
      "interior-detailing",
      "engine-bay-cleaning",
    ],
    features: [
      "Full decontamination",
      "Single-stage polish",
      "Interior shampoo",
      "Leather conditioning",
      "6-month sealant",
      "Engine bay clean",
    ],
  },
  {
    slug: "ultimate-protection",
    name: "Ultimate Protection",
    desc: "Showroom-grade ceramic protection.",
    priceLkr: null,
    timeEstimate: "TODO(pricing): confirm turnaround",
    includedServiceSlugs: [
      "paint-correction",
      "ceramic-coating",
      "interior-detailing",
      "headlight-restoration",
    ],
    features: [
      "Multi-stage correction",
      "9H ceramic coating",
      "Interior protection",
      "Wheel coating",
      "Glass coating",
      "5-year warranty",
    ],
  },
];

export function formatLkr(amount: number | null): string {
  if (amount === null) return "Contact for pricing";
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(amount);
}
