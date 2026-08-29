/**
 * Filter/sort option tables, kept free of product data so client islands
 * (toolbar, filters) can import them without bundling the mock catalog.
 */

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest arrivals" },
  { value: "best-selling", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Alphabetical" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export const CLOTHING_CATEGORIES = [
  "Dresses",
  "Blouses & Tops",
  "Skirts & Trousers",
  "Outerwear & Coats",
  "Nightwear & Loungewear",
  "Suits & Tailoring",
  "Accessories & Scarves",
  "Men's Silk Wear",
] as const;

export const FABRICS = [
  "100% Grade 6A Mulberry Silk",
  "Silk Crepe de Chine",
  "Silk Velvet",
  "Silk Satin",
  "Silk Organza",
  "Raw Silk & Linen",
  "Silk & Cashmere",
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const COLORS = [
  { name: "Ivory Cream", hex: "#F9F6F2" },
  { name: "Midnight Black", hex: "#171717" },
  { name: "Champagne Gold", hex: "#D4AF37" },
  { name: "Emerald Silk", hex: "#046A38" },
  { name: "Rose Quartz", hex: "#E7A1B0" },
  { name: "Obsidian Navy", hex: "#1A2530" },
  { name: "Bordeaux Red", hex: "#6B1D2F" },
] as const;

export const PRICE_RANGES = [
  { id: "under-200", label: "Under $200", min: 0, max: 200 },
  { id: "200-400", label: "$200 to $400", min: 200, max: 400 },
  { id: "400-700", label: "$400 to $700", min: 400, max: 700 },
  { id: "over-700", label: "$700 and above", min: 700, max: Number.POSITIVE_INFINITY },
] as const;

export type PriceRangeId = (typeof PRICE_RANGES)[number]["id"];

export const RATING_OPTIONS = [
  { id: "4.5", label: "4.5 & above", min: 4.5 },
  { id: "4.8", label: "4.8 & above", min: 4.8 },
] as const;

export type RatingId = (typeof RATING_OPTIONS)[number]["id"];
