/**
 * Domain types for the Ivory Silk catalog.
 * These mirror the shape Supabase queries will return later (section 44/46
 * of the blueprint); keep them stable so mock data can be swapped for live
 * queries without touching the UI.
 */

export type GarmentColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  creator: string;
  /** Clothing category (Dresses, Blouses & Tops, Skirts & Trousers, Outerwear, Nightwear & Loungewear, Suits & Tailoring, Accessories & Scarves, Men's Silk Wear) */
  category: string;
  /** Curated collection (Silk Essentials, Atelier Couture, Nightfall Silk, Resort & Riviera, Bespoke Tailoring) */
  collection: string;
  /** Fabric composition (e.g. 100% Grade 6A Mulberry Silk, Silk Crepe de Chine, Silk Velvet, etc.) */
  fabric: string;
  /** Available clothing sizes (XS, S, M, L, XL, XXL) */
  sizes: string[];
  /** Color swatches available */
  colors: GarmentColor[];
  /** Price in USD. */
  price: number;
  /** Original price shown struck through when the item is on sale. */
  compareAtPrice?: number;
  /** Average rating out of 5. */
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  /** Pins the product near the top of default sort. */
  featured?: boolean;
  shortDescription: string;
  /** Long-form editorial description on product page. */
  description: string;
  /** Garment features & craftsmanship highlights. */
  features: string[];
  /** Included items (e.g., silk travel pouch, extra belt, spare buttons). */
  includes: string[];
  /** Fabric care & laundering instructions. */
  care: string[];
  /** Garment fit style (e.g. Relaxed Fit, Tailored Fit, Oversized Fit). */
  fit: string;
  /** Model sizing information for reference. */
  modelInfo?: string;
  /** Primary editorial garment image. */
  image: string;
  /** Secondary image revealed on hover / lookbook view. */
  hoverImage: string;
  /** Additional detail images for gallery slider. */
  gallery?: string[];
  /** ISO date, drives Newest sort. */
  createdAt: string;
};
