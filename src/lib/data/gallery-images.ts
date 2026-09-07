import g1 from "@/assets/gallery-1.webp";
import g2 from "@/assets/gallery-2.webp";
import g3 from "@/assets/gallery-3.webp";
import g4 from "@/assets/gallery-4.webp";
import g5 from "@/assets/gallery-5.webp";
import g6 from "@/assets/gallery-6.webp";

export type GalleryImage = {
  src: string;
  w: number;
  h_: number;
  cat: string;
  label: string;
  h: string;
};

// Shared by the Gallery component and the /gallery route's ImageObject
// structured data, so the two never drift out of sync.
const galleryImages: GalleryImage[] = [
  {
    src: g1,
    w: 800,
    h_: 800,
    cat: "Sports",
    label: "Silver Coupe - Cut & Polish",
    h: "row-span-2",
  },
  { src: g2, w: 800, h_: 1000, cat: "SUV", label: "Black SUV - Ceramic", h: "" },
  { src: g3, w: 800, h_: 600, cat: "Interior", label: "Leather Detail", h: "" },
  {
    src: g4,
    w: 800,
    h_: 900,
    cat: "Sedan",
    label: "White Sedan - Paint Correction",
    h: "row-span-2",
  },
  { src: g5, w: 800, h_: 700, cat: "4x4", label: "Matte 4x4 Protection", h: "" },
  { src: g6, w: 800, h_: 800, cat: "Detail", label: "Headlight Restoration", h: "" },
];

export default galleryImages;
