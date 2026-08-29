"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { products } from "@/features/products/data/products";
import { getFacets } from "@/features/products/queries";

/**
 * Global catalog search (header). Selecting a product goes straight to its
 * page; submitting a free-form term lands on the shop with the query active.
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
  const { categories } = getFacets();

  const go = (href: string) => {
    onOpenChange(false);
    setTerm("");
    router.push(href);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Search products, categories and creators"
      showCloseButton
    >
      <CommandInput
        placeholder="Search products, categories, creators..."
        value={term}
        onValueChange={setTerm}
      />
      <CommandList>
        <CommandEmpty>
          <span className="text-[13px] text-smoke">
            Nothing found for &ldquo;{term}&rdquo;.
          </span>
        </CommandEmpty>
        {term.trim() ? (
          <CommandGroup heading="Search">
            <CommandItem
              value={`Search the catalog for ${term}`}
              onSelect={() => go(`/shop?q=${encodeURIComponent(term.trim())}`)}
            >
              <span className="text-[13px]">
                Search the catalog for &ldquo;{term.trim()}&rdquo;
              </span>
            </CommandItem>
          </CommandGroup>
        ) : null}
        <CommandGroup heading="Products">
          {products.map((product) => (
            <CommandItem
              key={product.id}
              value={`${product.name} ${product.creator} ${product.category}`}
              onSelect={() => go(`/product/${product.slug}`)}
            >
              <span className="text-[13px] text-ink">{product.name}</span>
              <span className="ml-auto text-[11px] text-smoke">
                {product.category}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Categories">
          {categories.map((category) => (
            <CommandItem
              key={category.name}
              value={`Category ${category.name}`}
              onSelect={() =>
                go(`/shop?category=${encodeURIComponent(category.name)}`)
              }
            >
              <span className="text-[13px] text-ink">{category.name}</span>
              <span className="ml-auto text-[11px] text-smoke">
                {category.count} {category.count === 1 ? "product" : "products"}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
