import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/commerce/product-grid";
import { ShopFilters } from "@/features/products/components/shop-filters";
import { ShopToolbar } from "@/features/products/components/shop-toolbar";
import {
  getFacets,
  parseShopParams,
  queryProducts,
  type ShopQuery,
} from "@/features/products/queries";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Ivory Silk catalog: templates, presets, fonts, and brand kits from independent studios.",
};

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const query = parseShopParams(await searchParams);
  const results = queryProducts(query);
  const { categories, collections } = getFacets();

  return (
    <div className="shell py-8 lg:py-12">
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.14em] text-smoke"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            Shop
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-line pb-8 lg:mt-8 lg:pb-10">
        <h1 className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl">
          The Catalog
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
          Digital templates, presets, and brand systems from independent
          studios — curated for craft, licensed for your work.
        </p>
      </header>

      <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden lg:block">
          <Suspense fallback={null}>
            <ShopFilters
              query={query}
              categories={categories}
              collections={collections}
              className="sticky top-24"
            />
          </Suspense>
        </aside>

        <div className="flex min-w-0 flex-col gap-8 lg:gap-10">
          <Suspense fallback={<div className="h-10" aria-hidden="true" />}>
            <ShopToolbar
              query={query}
              total={results.length}
              categories={categories}
              collections={collections}
            />
          </Suspense>

          {results.length > 0 ? (
            <ProductGrid products={results} view={query.view} />
          ) : (
            <EmptyResults query={query} />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyResults({ query }: { query: ShopQuery }) {
  const searching = query.q.length > 0;
  return (
    <div className="flex flex-col items-start gap-5 border-t border-line py-16 lg:py-24">
      <p className="text-micro text-smoke">No pieces found</p>
      <p className="max-w-md font-display text-2xl font-light leading-snug text-ink lg:text-3xl">
        {searching ? (
          <>
            Nothing in the catalog matches &ldquo;{query.q}&rdquo; yet.
          </>
        ) : (
          <>Nothing matches this combination of refinements.</>
        )}
      </p>
      <p className="text-sm leading-relaxed text-smoke">
        Try a different search, or clear the filters to browse the full
        collection.
      </p>
      <Link
        href="/shop"
        className="text-micro inline-flex h-11 items-center border border-ink px-8 text-ink outline-none transition-colors hover:bg-ink hover:text-ivory focus-visible:ring-1 focus-visible:ring-ring"
      >
        Clear all filters
      </Link>
    </div>
  );
}
