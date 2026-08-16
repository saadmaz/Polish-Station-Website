export type Package = {
  slug: string;
  name: string;
  desc: string;
  /** Price in LKR for a car. `null` means "price not yet supplied" - render as "Contact for pricing". */
  priceLkr: number | null;
  /** Price in LKR for an SUV, if it differs from the car price. */
  priceLkrSuv?: number | null;
  /** Coating durability, e.g. "3 Year Durability". Omitted for non-coating packages. */
  durability?: string;
  /** Groups cards on the pricing section: cut & polish / interior work vs. protective coatings. */
  category: "detailing" | "coating";
  popular?: boolean;
  /** Slugs from src/lib/data/services.ts bundled into this package. */
  includedServiceSlugs: string[];
  features: string[];
};

export const packages: Package[] = [
  {
    slug: "cut-and-polish",
    name: "Cut & Polish",
    desc: "Restore depth and clarity to factory paintwork.",
    priceLkr: 18500,
    priceLkrSuv: 22500,
    category: "detailing",
    includedServiceSlugs: ["cut-and-polish"],
    features: [
      "Paint preparation included",
      "Removes swirl marks & oxidation",
      "Removes light scratches",
      "Restores gloss and clarity",
    ],
  },
  {
    slug: "interior-restore",
    name: "Interior Restore",
    desc: "Deep cleaning and conditioning, seat to headliner.",
    priceLkr: 12500,
    priceLkrSuv: 14500,
    category: "detailing",
    includedServiceSlugs: ["interior-detailing"],
    features: [
      "Seats & carpets deep-cleaned",
      "Dashboard conditioning",
      "Full interior surface detail",
    ],
  },
  {
    slug: "cut-polish-interior",
    name: "2 in 1 Package",
    desc: "Cut & Polish plus Interior Restore, bundled.",
    priceLkr: 24500,
    priceLkrSuv: 28500,
    category: "detailing",
    popular: true,
    includedServiceSlugs: ["cut-and-polish", "interior-detailing"],
    features: [
      "Everything in Cut & Polish",
      "Everything in Interior Restore",
      "Bundled at a lower combined price",
    ],
  },
  {
    slug: "9h-ceramic-coating",
    name: "9H Ceramic Coating",
    desc: "A hard, glass-like shield that locks in a high-gloss finish.",
    priceLkr: 60000,
    durability: "3 Year Durability",
    category: "coating",
    includedServiceSlugs: ["ceramic-coating"],
    features: [
      "Includes professional paint correction",
      "9H hardness shield",
      "Repels water, dirt & UV damage",
      "High-gloss finish",
    ],
  },
  {
    slug: "10h-ceramic-coating",
    name: "10H Ceramic Coating",
    desc: "Our toughest ceramic shield, for maximum durability.",
    priceLkr: 75000,
    durability: "3 Year Durability",
    category: "coating",
    popular: true,
    includedServiceSlugs: ["ceramic-coating"],
    features: [
      "Includes professional paint correction",
      "10H hardness shield",
      "Repels water, dirt & UV damage",
      "High-gloss finish",
    ],
  },
  {
    slug: "graphene-coating",
    name: "Graphene Coating",
    desc: "Carbon-infused protection with our longest durability.",
    priceLkr: 145000,
    durability: "5 Year Durability",
    category: "coating",
    includedServiceSlugs: ["graphene-coating"],
    features: [
      "Includes professional paint correction",
      "Repels heat & water spots",
      "Long-lasting hydrophobic protection",
      "High-gloss finish",
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
