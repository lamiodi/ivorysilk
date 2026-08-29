import { products } from "./data/products";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  SORT_OPTIONS,
  type SortKey,
} from "./filter-options";
import type { Product } from "./types";

/**
 * Query layer for the catalog.
 *
 * Everything here is a pure function over the mock dataset with the same
 * signature a Supabase query builder will need later: parse URL params,
 * filter, sort. When the database lands, only these functions change.
 */

export { PRICE_RANGES, RATING_OPTIONS, SORT_OPTIONS };
export type { SortKey };

export type ShopQuery = {
  q: string;
  categories: string[];
  collection: string | null;
  sizes: string[];
  fabrics: string[];
  price: (typeof PRICE_RANGES)[number]["id"] | null;
  rating: (typeof RATING_OPTIONS)[number]["id"] | null;
  sort: SortKey;
  view: "grid" | "list";
};

type RawParams = Record<string, string | string[] | undefined>;

const SORT_KEYS = new Set<string>(SORT_OPTIONS.map((option) => option.value));

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Normalizes Next.js searchParams into a typed ShopQuery. */
export function parseShopParams(raw: RawParams): ShopQuery {
  const categoryParam = first(raw.category);
  const sizeParam = first(raw.size);
  const fabricParam = first(raw.fabric);
  const sortParam = first(raw.sort);
  const priceParam = first(raw.price);
  const ratingParam = first(raw.rating);

  return {
    q: first(raw.q)?.trim() ?? "",
    categories: categoryParam ? categoryParam.split(",").filter(Boolean) : [],
    collection: first(raw.collection) || null,
    sizes: sizeParam ? sizeParam.split(",").filter(Boolean) : [],
    fabrics: fabricParam ? fabricParam.split(",").filter(Boolean) : [],
    price: PRICE_RANGES.some((range) => range.id === priceParam)
      ? (priceParam as ShopQuery["price"])
      : null,
    rating: RATING_OPTIONS.some((option) => option.id === ratingParam)
      ? (ratingParam as ShopQuery["rating"])
      : null,
    sort: SORT_KEYS.has(sortParam ?? "") ? (sortParam as SortKey) : "featured",
    view: first(raw.view) === "list" ? "list" : "grid",
  };
}

/** Filters and sorts the catalog for a parsed ShopQuery. */
export function queryProducts(query: ShopQuery): Product[] {
  const term = query.q.toLowerCase();
  const priceRange = PRICE_RANGES.find((range) => range.id === query.price);
  const ratingOption = RATING_OPTIONS.find((option) => option.id === query.rating);

  const filtered = products.filter((product) => {
    if (
      term &&
      ![product.name, product.creator, product.category, product.collection, product.fabric]
        .join(" ")
        .toLowerCase()
        .includes(term)
    ) {
      return false;
    }
    if (query.categories.length > 0 && !query.categories.includes(product.category)) {
      return false;
    }
    if (query.collection && product.collection !== query.collection) {
      return false;
    }
    if (
      query.sizes.length > 0 &&
      !query.sizes.some((size) => product.sizes?.includes(size))
    ) {
      return false;
    }
    if (
      query.fabrics.length > 0 &&
      !query.fabrics.some((fab) => product.fabric?.toLowerCase().includes(fab.toLowerCase()))
    ) {
      return false;
    }
    if (priceRange && (product.price < priceRange.min || product.price > priceRange.max)) {
      return false;
    }
    if (ratingOption && product.rating < ratingOption.min) {
      return false;
    }
    return true;
  });

  return sortProducts(filtered, query.sort);
}

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "best-selling":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          Number(b.isBestseller ?? false) - Number(a.isBestseller ?? false) ||
          b.createdAt.localeCompare(a.createdAt),
      );
  }
}

export type Facet = { name: string; count: number };

/** Categories and collections with product counts, for filter sidebars. */
export function getFacets(): { categories: Facet[]; collections: Facet[] } {
  const count = (key: "category" | "collection") =>
    products.reduce<Map<string, number>>((map, product) => {
      map.set(product[key], (map.get(product[key]) ?? 0) + 1);
      return map;
    }, new Map());

  const toFacets = (map: Map<string, number>): Facet[] =>
    [...map.entries()]
      .map(([name, total]) => ({ name, count: total }))
      .sort((a, b) => a.name.localeCompare(b.name));

  return {
    categories: toFacets(count("category")),
    collections: toFacets(count("collection")),
  };
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id && candidate.category === product.category,
    )
    .slice(0, limit);
}

/** Homepage rails: newest, pinned editor picks, and most-reviewed. */
export function getNewArrivals(limit = 4): Product[] {
  return sortProducts(products, "newest").slice(0, limit);
}

export function getEditorsPicks(limit = 4): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getTrending(limit = 4): Product[] {
  return sortProducts(products, "best-selling").slice(0, limit);
}

/** Studios represented in the catalog, with piece counts. */
export function getCreators(): Facet[] {
  const counts = products.reduce<Map<string, number>>((map, product) => {
    map.set(product.creator, (map.get(product.creator) ?? 0) + 1);
    return map;
  }, new Map());
  return [...counts.entries()]
    .map(([name, total]) => ({ name, count: total }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
