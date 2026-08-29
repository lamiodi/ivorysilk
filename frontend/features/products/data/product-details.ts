/**
 * Technical details, license and FAQ content for the PDP.
 *
 * File formats and compatibility genuinely correlate with category, so they
 * are derived rather than duplicated per product. When Supabase lands these
 * become columns; the helper signature stays the same.
 */

export type ProductDetails = {
  fileFormats: string[];
  fileSize: string;
  compatibility: string;
};

const DETAILS_BY_CATEGORY: Record<string, ProductDetails> = {
  "Branding Kits": {
    fileFormats: ["Canva", "Figma", "PDF"],
    fileSize: "184 MB",
    compatibility: "Canva (free or Pro) and Figma (any plan)",
  },
  "Notion Templates": {
    fileFormats: ["Notion", "PDF"],
    fileSize: "12 MB",
    compatibility: "Notion (free or Plus), any browser",
  },
  "Lightroom Presets": {
    fileFormats: ["XMP", "DNG"],
    fileSize: "24 MB",
    compatibility: "Lightroom Classic, CC and Mobile",
  },
  "Social Media Templates": {
    fileFormats: ["Canva"],
    fileSize: "96 MB",
    compatibility: "Canva (free or Pro)",
  },
  Fonts: {
    fileFormats: ["OTF", "WOFF", "WOFF2"],
    fileSize: "8 MB",
    compatibility: "Mac, Windows and web",
  },
  "E-books": {
    fileFormats: ["PDF"],
    fileSize: "38 MB",
    compatibility: "Any PDF reader, print-ready",
  },
  "UI Kits": {
    fileFormats: ["Figma"],
    fileSize: "142 MB",
    compatibility: "Figma (any plan)",
  },
  Mockups: {
    fileFormats: ["PSD", "JPG"],
    fileSize: "1.2 GB",
    compatibility: "Photoshop CC 2021+",
  },
  "Canva Templates": {
    fileFormats: ["Canva", "PDF"],
    fileSize: "74 MB",
    compatibility: "Canva (free or Pro)",
  },
  "Figma Files": {
    fileFormats: ["Figma"],
    fileSize: "58 MB",
    compatibility: "Figma (any plan)",
  },
};

const FALLBACK: ProductDetails = {
  fileFormats: ["Digital download"],
  fileSize: "—",
  compatibility: "See product description",
};

export function getProductDetails(category: string): ProductDetails {
  return DETAILS_BY_CATEGORY[category] ?? FALLBACK;
}

/** Site-wide standard license, shown on every PDP. */
export const STANDARD_LICENSE = {
  name: "Ivory Silk Standard License",
  bullets: [
    "Use in unlimited personal and commercial projects you own",
    "Use in client work for a single end client per purchase",
    "Resale, redistribution or repackaging as your own product is not permitted",
    "Extended and team licenses available on request",
  ],
};

/** Site-wide FAQ, shown on every PDP. */
export const PRODUCT_FAQ = [
  {
    question: "How do I receive my files?",
    answer:
      "Immediately after checkout you will see a download link on the confirmation page, and the same secure link arrives by email. Links stay active so you can re-download whenever you need.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Ivory Silk is guest-first: check out with your email and your order is always reachable through your receipt and download email.",
  },
  {
    question: "Can I use this in client work?",
    answer:
      "Yes. The Standard License covers unlimited projects you own and client work for a single end client per purchase. For teams or multi-client use, ask us about the Extended License.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Because files are delivered instantly, all sales are final. If a file is damaged or not as described, write to us within 14 days and we will make it right.",
  },
  {
    question: "Do I get future updates?",
    answer:
      "Yes. Every purchase includes lifetime access to updates. When a product improves, the new files appear on your original download link.",
  },
];
