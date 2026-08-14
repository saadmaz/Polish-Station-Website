import {
  Sparkles,
  Droplets,
  Shield,
  Sofa,
  Car,
  Atom,
  Wrench,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  /** The "why this matters" explainer shown on the service's own page. */
  why: string;
  /** Ordered process steps specific to this service. */
  process: string[];
  /** Rough turnaround estimate, e.g. "2-3 hrs", "Full day". TODO(pricing): confirm real estimates. */
  timeEstimate: string;
};

export const services: Service[] = [
  {
    slug: "paint-correction",
    icon: Sparkles,
    title: "Paint Correction",
    shortDesc: "Multi-stage compounding to erase swirls, scratches and oxidation.",
    why: "Daily washing, automated car washes and everyday road grit leave behind swirl marks and fine scratches that dull a car's finish over time. Paint correction machine-polishes those defects out in stages, restoring the paint's original clarity and depth before any protective coating goes on top - skipping this step means sealing swirls under the coating permanently.",
    process: [
      "Wash & decontaminate to strip embedded contaminants",
      "Paint depth reading to confirm safe correction margin",
      "Multi-stage compounding and polishing under raking light",
      "Panel wipe-down and finish inspection",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "cut-and-polish",
    icon: Droplets,
    title: "Cut & Polish",
    shortDesc: "Restore depth and clarity to factory paintwork.",
    why: "A lighter, single-stage version of correction for paint that's faded or lightly oxidized rather than heavily swirled. It brings back gloss and depth without the multi-stage time investment full correction requires - the right call for a car that's been cared for but has lost its shine.",
    process: [
      "Wash & clay bar decontamination",
      "Single-stage machine polish",
      "Wipe-down and gloss check",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "ceramic-coating",
    icon: Shield,
    title: "Ceramic Coating",
    shortDesc: "9H hardness, hydrophobic, years of glass-like protection.",
    why: "Wax and sealants wear off in weeks. A ceramic coating chemically bonds to the clear coat, forming a hard, hydrophobic layer that protects against UV fading, bird droppings, road salt and light abrasion for years, not weeks - and it's what makes a car sheet water off on the highway instead of pooling. For a $1,000+ line item, the honest case for it is protection economics: it's cheaper than repeated paint correction from unprotected wear.",
    process: [
      "Full paint correction (a coating locks in whatever is underneath it)",
      "Surface prep wipe-down to remove polishing oils",
      "Coating applied panel-by-panel and leveled",
      "Cure time before the car can get wet",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "graphene-coating",
    icon: Atom,
    title: "Graphene Coating",
    shortDesc: "Next-gen protection with extreme heat dissipation.",
    why: "A newer coating chemistry that layers graphene with the ceramic base for better heat dissipation and slightly more flexibility than pure ceramic, which matters most on dark-colored cars that run hotter in direct sun and on wraps/PPF where a rigid ceramic layer can micro-crack.",
    process: [
      "Full paint correction",
      "Surface prep wipe-down",
      "Graphene coating applied and leveled",
      "Cure time before the car can get wet",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "interior-detailing",
    icon: Sofa,
    title: "Interior Detailing",
    shortDesc: "Deep extraction, leather conditioning, sanitization.",
    why: "Interior wear is what actually shows up at resale time - cracked leather, stained fabric and faded trim age a car faster than the exterior does. Deep extraction and conditioning gets ahead of that instead of just vacuuming around it.",
    process: [
      "Full interior vacuum, including seat tracks and vents",
      "Steam extraction on carpets and fabric seats",
      "Leather cleaning and conditioning",
      "Trim, glass and vent detailing",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "exterior-detailing",
    icon: Car,
    title: "Exterior Detailing",
    shortDesc: "Decontamination, clay treatment, finish refinement.",
    why: "A wash alone doesn't remove bonded contaminants - tar, rail dust, industrial fallout - that sit on top of the clear coat and feel gritty to the touch. Clay decontamination lifts that layer out before any polishing or coating work, which is also why it's a prerequisite step for both.",
    process: [
      "Pre-rinse and snow-foam wash",
      "Clay bar or clay mitt decontamination",
      "Wheel, tire and trim detailing",
      "Finish wipe-down",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "engine-bay-cleaning",
    icon: Wrench,
    title: "Engine Bay Cleaning",
    shortDesc: "Safe degreasing and dressing for showroom engines.",
    why: "A clean engine bay makes leaks and wear visible during routine checks - grime hides the same problems it causes. Done with electrical components covered and low-pressure rinsing, it's cosmetic and diagnostic at once.",
    process: [
      "Cover sensitive electrical components",
      "Degrease and agitate",
      "Low-pressure rinse",
      "Dress plastics and rubber seals",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
  {
    slug: "headlight-restoration",
    icon: Lightbulb,
    title: "Headlight Restoration",
    shortDesc: "Clarity, UV protection and brighter night vision.",
    why: "Cloudy headlights aren't just cosmetic - UV-oxidized polycarbonate lenses measurably cut how far your headlights actually throw light at night. Restoration wet-sands the oxidized layer off and reseals it with a UV-resistant coating, which is meaningfully cheaper than replacing the housings.",
    process: [
      "Mask surrounding paint and trim",
      "Wet-sand through progressive grits",
      "Polish to optical clarity",
      "Apply UV-protective sealant",
    ],
    timeEstimate: "TODO(pricing): confirm turnaround",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
