/**
 * Collection metadata for editorial surfaces (homepage cards, collections
 * index). Product membership stays on the product itself; this module only
 * holds presentation copy and imagery.
 */

export type CollectionMeta = {
  name: string;
  /** URL slug used by the collections index. */
  slug: string;
  tagline: string;
  description: string;
  image: string;
};

export const collections: CollectionMeta[] = [
  {
    name: "Silk Essentials",
    slug: "silk-essentials",
    tagline: "Timeless Foundations",
    description:
      "Core wardrobe foundations handcrafted in 100% Grade 6A 22-momme Mulberry Silk. Fluid camisoles, classic blouses, and tailored silk staples.",
    image: "/images/collection-essentials.png",
  },
  {
    name: "Atelier Couture",
    slug: "atelier-couture",
    tagline: "Haute Couture Silhouettes",
    description:
      "Sculptural evening gowns, draped slip dresses, and statement pleated silhouettes designed for galas and black-tie affairs.",
    image: "/images/collection-couture.png",
  },
  {
    name: "Nightfall Silk",
    slug: "nightfall-silk",
    tagline: "Opulent Evening & Loungewear",
    description:
      "Unapologetically luxurious silk pyjama sets, velvet-trimmed robes, and midnight kimonos crafted for sanctuary and repose.",
    image: "/images/collection-nightfall.png",
  },
  {
    name: "Resort & Riviera",
    slug: "resort-and-riviera",
    tagline: "Fluid Vacation Elegance",
    description:
      "Breezy raw silk-linen resort shirts, tiered sun dresses, and effortless holiday garments made for coastal retreats.",
    image: "/images/collection-resort.png",
  },
  {
    name: "Bespoke Tailoring",
    slug: "bespoke-tailoring",
    tagline: "Precision Silk Tailoring",
    description:
      "Sharp double-breasted blazers, high-waisted wide-leg trousers, and silk-wool tailored suits crafted by master atelier patternmakers.",
    image: "/images/collection-essentials.png",
  },
];

export function getCollectionMeta(name: string): CollectionMeta | undefined {
  return collections.find((collection) => collection.name === name);
}
