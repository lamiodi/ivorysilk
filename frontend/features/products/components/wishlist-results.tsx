"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { useStoredCollection, wishlist } from "@/lib/commerce-store";
import { products } from "../data/products";

/**
 * Client island for the wishlist page. The ids live in localStorage, so the
 * server render shows a calm skeleton until the store hydrates on mount.
 */
export function WishlistResults() {
  const ids = useStoredCollection(wishlist);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14 2xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-[3/4] w-full rounded-none" />
            <Skeleton className="mt-4 h-3 w-16 rounded-none" />
            <Skeleton className="mt-2 h-4 w-3/4 rounded-none" />
          </div>
        ))}
      </div>
    );
  }

  const saved = products.filter((product) => ids.includes(product.id));

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 py-16 lg:py-24">
        <p className="text-micro text-smoke">Nothing saved yet</p>
        <p className="max-w-md font-display text-2xl font-light leading-snug text-ink lg:text-3xl">
          Your wishlist is empty — for now.
        </p>
        <p className="text-sm leading-relaxed text-smoke">
          Tap the heart on any piece to keep it here for later.
        </p>
        <Link
          href="/shop"
          className="text-micro inline-flex h-11 items-center border border-ink px-8 text-ink outline-none transition-colors hover:bg-ink hover:text-ivory focus-visible:ring-1 focus-visible:ring-ring"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  return <ProductGrid products={saved} />;
}
