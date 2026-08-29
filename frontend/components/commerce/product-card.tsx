import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/features/products/types";
import { Price } from "./price";
import { QuickAddButton } from "./quick-add-button";
import { WishlistButton } from "./wishlist-button";

const GRID_IMAGE_SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 320px";
const LIST_IMAGE_SIZES = "(max-width: 640px) 112px, 176px";

/**
 * The reusable catalog card. Borderless editorial structure taken from the
 * reference template: image on a mist ground, micro uppercase meta, price in
 * the same quiet register. Wishlist and quick-add are client islands; the
 * card itself stays a Server Component.
 */
export function ProductCard({
  product,
  layout = "grid",
  priority = false,
}: {
  product: Product;
  layout?: "grid" | "list";
  priority?: boolean;
}) {
  const badge = product.isNew
    ? "New"
    : product.isBestseller
      ? "Bestseller"
      : null;

  if (layout === "list") {
    return (
      <article className="group flex gap-5 py-6 first:pt-0 last:pb-0 sm:gap-8">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden bg-mist outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-44"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={LIST_IMAGE_SIZES}
            className="object-cover transition-transform duration-700 ease-luxe motion-safe:group-hover:scale-[1.03]"
          />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-smoke">
            {product.category}
          </p>
          <h3 className="text-[12px] font-medium uppercase leading-relaxed tracking-[0.14em] text-ink">
            <Link
              href={`/product/${product.slug}`}
              className="outline-none transition-colors hover:text-smoke focus-visible:ring-1 focus-visible:ring-ring"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-[11px] text-smoke">{product.creator}</p>
          <p className="hidden max-w-md text-[13px] leading-relaxed text-smoke sm:block sm:line-clamp-2">
            {product.shortDescription}
          </p>
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="pt-1"
          />
          <div className="mt-3 flex items-center gap-3">
            <QuickAddButton
              id={product.id}
              name={product.name}
              variant="inline"
              className="h-9 px-5"
            />
            <WishlistButton
              id={product.id}
              name={product.name}
              variant="inline"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-mist">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="absolute inset-0 block transition-transform duration-700 ease-luxe motion-safe:group-hover:scale-[1.03]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              sizes={GRID_IMAGE_SIZES}
              className="object-cover"
            />
            <Image
              src={product.hoverImage}
              alt=""
              aria-hidden
              fill
              sizes={GRID_IMAGE_SIZES}
              className="object-cover opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100"
            />
          </span>
        </Link>
        {badge ? (
          <span className="pointer-events-none absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
        <div className="absolute right-3 top-3 transition-opacity duration-200 lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
          <WishlistButton id={product.id} name={product.name} />
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-luxe group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none max-lg:hidden">
          <QuickAddButton id={product.id} name={product.name} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
            {product.category}
          </p>
          {product.fabric && (
            <span className="text-[9px] text-smoke font-light line-clamp-1 max-w-[120px]">
              {product.fabric.split(" ")[0]} {product.fabric.split(" ")[1] || ""}
            </span>
          )}
        </div>
        <h3 className="text-[12px] font-medium uppercase leading-relaxed tracking-[0.14em] text-ink">
          <Link
            href={`/product/${product.slug}`}
            className="outline-none transition-colors hover:text-smoke focus-visible:ring-1 focus-visible:ring-ring"
          >
            {product.name}
          </Link>
        </h3>
        
        {/* Color swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 py-0.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="size-2.5 rounded-full border border-line shadow-xs"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[9px] text-smoke">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className="pt-0.5"
        />
      </div>
    </article>
  );
}
