"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/features/products/data/products";
import { getFacets } from "@/features/products/queries";
import { cn } from "@/lib/utils";

/**
 * Global catalog search (header). Selecting a product goes straight to its
 * page; submitting a free-form term lands on the shop with the query active.
 *
 * Implemented as a plain overlay (no base-ui Dialog) to avoid third-party
 * `useSyncExternalStore` integrations that intermittently fail to mount
 * in production builds.
 */
export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { categories } = getFacets();

  // Lock body scroll while open & auto-focus the input.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (href: string) => {
    onOpenChange(false);
    setTerm("");
    router.push(href);
  };

  const filteredProducts = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) =>
      [product.name, product.creator, product.category, product.collection]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [term]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the catalog"
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-20 sm:pt-32"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-xl overflow-hidden border border-line bg-popover text-popover-foreground shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <svg
            className="size-4 shrink-0 opacity-60"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M14 14l3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search products, categories, creators..."
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-smoke outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-none border border-line px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-smoke transition-colors hover:border-ink hover:text-ink"
            aria-label="Close"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {term.trim() && (
            <button
              type="button"
              onClick={() => go(`/shop?q=${encodeURIComponent(term.trim())}`)}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-[13px] text-ink transition-colors hover:bg-mist"
            >
              <span>
                Search the catalog for &ldquo;{term.trim()}&rdquo;
              </span>
            </button>
          )}

          {filteredProducts.length === 0 ? (
            <p className="px-3 py-6 text-center text-[13px] text-smoke">
              Nothing found for &ldquo;{term}&rdquo;.
            </p>
          ) : (
            <div>
              <p className="px-3 pt-3 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-smoke">
                Products
              </p>
              <ul>
                {filteredProducts.slice(0, 10).map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => go(`/product/${product.slug}`)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left text-[13px] transition-colors hover:bg-mist",
                      )}
                    >
                      <span className="text-ink">{product.name}</span>
                      <span className="ml-auto text-[11px] text-smoke">
                        {product.category}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {categories.length > 0 && (
            <div className="mt-2 border-t border-line pt-2">
              <p className="px-3 pt-2 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-smoke">
                Categories
              </p>
              <ul>
                {categories.map((category) => (
                  <li key={category.name}>
                    <button
                      type="button"
                      onClick={() =>
                        go(`/shop?category=${encodeURIComponent(category.name)}`)
                      }
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-[13px] transition-colors hover:bg-mist"
                    >
                      <span className="text-ink">{category.name}</span>
                      <span className="ml-auto text-[11px] text-smoke">
                        {category.count}{" "}
                        {category.count === 1 ? "product" : "products"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
