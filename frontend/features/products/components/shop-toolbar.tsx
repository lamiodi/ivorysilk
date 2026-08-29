"use client";

import {
  MagnifyingGlass,
  Rows,
  SlidersHorizontal,
  SquaresFour,
  X,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PRICE_RANGES,
  RATING_OPTIONS,
  SORT_OPTIONS,
} from "../filter-options";
import type { Facet, ShopQuery } from "../queries";
import { ShopFilters } from "./shop-filters";
import { useShopParams } from "./use-shop-params";

/**
 * Toolbar above the catalog: search, sort, view switch, result count and
 * the mobile entry point to the filter panel. Every control writes to the
 * URL so the server re-renders the grid with the same query.
 */
export function ShopToolbar({
  query,
  total,
  categories,
  collections,
}: {
  query: ShopQuery;
  total: number;
  categories: Facet[];
  collections: Facet[];
}) {
  const { setParams } = useShopParams();
  const [term, setTerm] = useState(query.q);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const lastSynced = useRef(query.q);

  // Keep the field in sync when q changes elsewhere (chips, palette, nav).
  useEffect(() => {
    if (query.q !== lastSynced.current) {
      lastSynced.current = query.q;
      setTerm(query.q);
    }
  }, [query.q]);

  // Debounce writes so typing doesn't thrash the URL.
  useEffect(() => {
    if (term === query.q) return;
    const timeout = setTimeout(() => setParams({ q: term || null }), 350);
    return () => clearTimeout(timeout);
  }, [term, query.q, setParams]);

  const chips = activeChips(query);

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: Filters button + Search (mobile) | Search + counter + sort + view (desktop) */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mobile filter entry */}
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                className="h-10 shrink-0 gap-2 rounded-none border-ink bg-transparent px-4 text-micro text-ink transition-colors hover:bg-ink hover:text-ivory lg:hidden"
              />
            }
          >
            <SlidersHorizontal size={15} weight="light" />
            Filters
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[88vw] max-w-sm gap-0 bg-ivory p-0"
          >
            <SheetHeader className="border-b border-line p-5">
              <SheetTitle className="font-display text-lg font-medium tracking-[0.08em] uppercase">
                Refine
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <ShopFilters
                query={query}
                categories={categories}
                collections={collections}
              />
            </div>
            <SheetFooter className="border-t border-line p-5">
              <Button
                onClick={() => setFiltersOpen(false)}
                className="h-11 w-full rounded-none bg-ink text-ivory text-micro hover:bg-gold"
              >
                View {total} {total === 1 ? "piece" : "pieces"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div className="relative order-2 min-w-0 flex-1 basis-full sm:order-1 sm:basis-auto sm:min-w-44 sm:max-w-64">
          <MagnifyingGlass
            size={15}
            weight="light"
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-smoke"
          />
          <Input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search"
            aria-label="Search the catalog"
            className="h-10 w-full rounded-none border-line pl-9 text-[13px] placeholder:text-stone"
          />
        </div>

        <p className="ml-auto hidden text-[11px] uppercase tracking-[0.08em] text-smoke sm:block">
          {total} {total === 1 ? "piece" : "pieces"}
        </p>

        {/* Sort */}
        <div className="order-3 w-full min-w-0 sm:order-2 sm:w-auto sm:shrink-0">
          <Select
            value={query.sort}
            onValueChange={(value) => setParams({ sort: String(value) })}
          >
            <SelectTrigger
              aria-label="Sort products"
              className="h-10 w-full rounded-none border-line text-micro sm:w-44"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="rounded-none">
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-[13px]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View toggle */}
        <div
          role="group"
          aria-label="Change layout"
          className="hidden items-center border border-line sm:flex"
        >
          <ViewButton
            pressed={query.view === "grid"}
            label="Grid view"
            onClick={() => setParams({ view: null })}
          >
            <SquaresFour size={16} weight="light" />
          </ViewButton>
          <ViewButton
            pressed={query.view === "list"}
            label="List view"
            onClick={() => setParams({ view: "list" })}
          >
            <Rows size={16} weight="light" />
          </ViewButton>
        </div>
      </div>

      {/* Active refinements */}
      {chips.length > 0 && (
        <ul className="flex flex-wrap items-center gap-2" aria-label="Active filters">
          {chips.map((chip) => (
            <li key={chip.key}>
              <button
                type="button"
                onClick={() => setParams(chip.clear)}
                className="group inline-flex h-7 items-center gap-1.5 border border-line bg-cream px-2.5 text-[11px] tracking-[0.06em] text-ink uppercase outline-none transition-colors hover:border-ink focus-visible:ring-1 focus-visible:ring-ring"
              >
                {chip.label}
                <X
                  size={12}
                  weight="light"
                  aria-hidden
                  className="text-stone transition-colors group-hover:text-ink"
                />
                <span className="sr-only">Remove filter</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ViewButton({
  pressed,
  label,
  onClick,
  children,
}: {
  pressed: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-10 items-center justify-center outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring",
        pressed ? "bg-ink text-ivory" : "text-smoke hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

type Chip = { key: string; label: string; clear: Record<string, string | null> };

function activeChips(query: ShopQuery): Chip[] {
  const chips: Chip[] = [];

  if (query.q) {
    chips.push({ key: "q", label: `“${query.q}”`, clear: { q: null } });
  }
  for (const category of query.categories) {
    const rest = query.categories.filter((name) => name !== category);
    chips.push({
      key: `category-${category}`,
      label: category,
      clear: { category: rest.length > 0 ? rest.join(",") : null },
    });
  }
  if (query.collection) {
    chips.push({
      key: "collection",
      label: query.collection,
      clear: { collection: null },
    });
  }
  if (query.price) {
    const range = PRICE_RANGES.find((option) => option.id === query.price);
    if (range) {
      chips.push({ key: "price", label: range.label, clear: { price: null } });
    }
  }
  if (query.rating) {
    const rating = RATING_OPTIONS.find((option) => option.id === query.rating);
    if (rating) {
      chips.push({
        key: "rating",
        label: rating.label,
        clear: { rating: null },
      });
    }
  }
  return chips;
}
