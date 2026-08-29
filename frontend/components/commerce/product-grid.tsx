import type { Product } from "@/features/products/types";
import { GridReveal } from "./grid-reveal";
import { ProductCard } from "./product-card";

/**
 * Catalog results. Grid: 2 / 3 / 4 columns with wide vertical rhythm.
 * List: divided editorial rows. Both stay server-rendered; only the
 * reveal wrapper and card actions are client islands.
 */
export function ProductGrid({
  products,
  view = "grid",
}: {
  products: Product[];
  view?: "grid" | "list";
}) {
  if (view === "list") {
    return (
      <div className="divide-y divide-line border-t border-line">
        {products.map((product, index) => (
          <GridReveal key={product.id} index={index}>
            <ProductCard product={product} layout="list" priority={index < 2} />
          </GridReveal>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14 2xl:grid-cols-4">
      {products.map((product, index) => (
        <GridReveal key={product.id} index={index}>
          <ProductCard product={product} priority={index < 4} />
        </GridReveal>
      ))}
    </div>
  );
}
