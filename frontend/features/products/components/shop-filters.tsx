"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { PRICE_RANGES, RATING_OPTIONS } from "../filter-options";
import type { Facet, ShopQuery } from "../queries";
import { useShopParams } from "./use-shop-params";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function ShopFilters({
  query,
  categories,
  collections,
  className,
}: {
  query: ShopQuery;
  categories: Facet[];
  collections: Facet[];
  className?: string;
}) {
  const { setParams } = useShopParams();

  const hasActive =
    query.categories.length > 0 ||
    query.collection !== null ||
    query.sizes.length > 0 ||
    query.price !== null ||
    query.rating !== null;

  const toggleCategory = (name: string, checked: boolean) => {
    const next = checked
      ? [...query.categories, name]
      : query.categories.filter((category) => category !== name);
    setParams({ category: next.length > 0 ? next.join(",") : null });
  };

  const toggleSize = (size: string) => {
    const isSelected = query.sizes.includes(size);
    const next = isSelected
      ? query.sizes.filter((s) => s !== size)
      : [...query.sizes, size];
    setParams({ size: next.length > 0 ? next.join(",") : null });
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-micro text-ink">Filters</h2>
        {hasActive && (
          <button
            type="button"
            onClick={() =>
              setParams({ category: null, collection: null, size: null, price: null, rating: null })
            }
            className="text-[11px] tracking-[0.06em] text-smoke underline decoration-line underline-offset-4 outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection title="Category">
        <ul className="flex flex-col gap-3">
          {categories.map((category) => {
            const id = `category-${category.name}`;
            return (
              <li key={category.name} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={query.categories.includes(category.name)}
                  onCheckedChange={(checked) =>
                    toggleCategory(category.name, checked === true)
                  }
                />
                <label
                  htmlFor={id}
                  className="flex flex-1 cursor-pointer items-baseline justify-between text-[13px] text-ink"
                >
                  {category.name}
                  <span className="text-[11px] text-stone">{category.count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Garment Size">
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => {
            const isSelected = query.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={cn(
                  "h-9 border text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer",
                  isSelected
                    ? "bg-ink text-ivory border-ink"
                    : "bg-white text-ink border-line hover:border-ink"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Collection Filter */}
      <FilterSection title="Collection">
        <RadioGroup
          value={query.collection ?? ""}
          onValueChange={(value) =>
            setParams({ collection: value === "" ? null : String(value) })
          }
          className="gap-3"
        >
          <FilterRadio value="" label="All collections" />
          {collections.map((collection) => (
            <FilterRadio
              key={collection.name}
              value={collection.name}
              label={collection.name}
              count={collection.count}
            />
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price Range">
        <RadioGroup
          value={query.price ?? ""}
          onValueChange={(value) =>
            setParams({ price: value === "" ? null : String(value) })
          }
          className="gap-3"
        >
          <FilterRadio value="" label="All price tiers" />
          {PRICE_RANGES.map((range) => (
            <FilterRadio key={range.id} value={range.id} label={range.label} />
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="Rating">
        <RadioGroup
          value={query.rating ?? ""}
          onValueChange={(value) =>
            setParams({ rating: value === "" ? null : String(value) })
          }
          className="gap-3"
        >
          <FilterRadio value="" label="Any rating" />
          {RATING_OPTIONS.map((option) => (
            <FilterRadio key={option.id} value={option.id} label={option.label} />
          ))}
        </RadioGroup>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-6 first:mt-2">
      <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-smoke">
        {title}
      </h3>
      {children}
    </section>
  );
}

function FilterRadio({
  value,
  label,
  count,
}: {
  value: string;
  label: string;
  count?: number;
}) {
  const id = `radio-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="flex items-center gap-2.5">
      <RadioGroupItem id={id} value={value} />
      <label
        htmlFor={id}
        className="flex flex-1 cursor-pointer items-baseline justify-between text-[13px] text-ink"
      >
        {label}
        {count !== undefined && (
          <span className="text-[11px] text-stone">{count}</span>
        )}
      </label>
    </div>
  );
}
