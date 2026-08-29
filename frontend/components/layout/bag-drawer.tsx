"use client";

import { Minus, Plus, Trash, PlusCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { products } from "@/features/products/data/products";
import { bag, useBagItems } from "@/lib/commerce-store";

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const FREE_SHIPPING_THRESHOLD = 300;

export function BagDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const bagItems = useBagItems();

  const cartEntries = bagItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const subtotal = cartEntries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );

  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  // Recommendations: products not currently in the bag
  const currentItemIds = new Set(cartEntries.map((e) => e.product.id));
  const suggestedProducts = products
    .filter((p) => !currentItemIds.has(p.id))
    .slice(0, 3);

  const quickAddSuggestion = (prodId: string) => {
    const targetProduct = products.find((p) => p.id === prodId);
    if (!targetProduct) return;
    const defaultSize = targetProduct.sizes[0] || "S";
    const defaultColor = targetProduct.colors[0]?.name || "Ivory Cream";
    bag.addItem(targetProduct.id, defaultSize, defaultColor, 1);
    toast.success(`Added ${targetProduct.name} to your bag`, {
      description: `Size ${defaultSize} • ${defaultColor}`,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-md bg-ivory"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-b border-line pb-4">
          <SheetTitle className="text-micro text-ink flex items-center justify-between">
            <span>Your Shopping Bag</span>
            <span className="font-normal text-xs text-smoke">
              {cartEntries.length} {cartEntries.length === 1 ? "garment" : "garments"}
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Items saved in your shopping bag
          </SheetDescription>

          {/* Free Shipping Meter */}
          <div className="mt-3 rounded-none bg-gold-soft/50 p-3">
            <div className="flex items-center justify-between text-[11px] font-medium tracking-wide text-ink">
              {amountForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-gold">{formatUsd(amountForFreeShipping)}</strong> for complimentary express shipping
                </span>
              ) : (
                <span className="text-gold font-semibold">
                  ✓ You have unlocked complimentary express shipping
                </span>
              )}
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden bg-line">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {cartEntries.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl text-ink">Your bag is empty</p>
            <p className="max-w-[28ch] text-[13px] leading-relaxed text-smoke">
              Discover our Mulberry Silk & Atelier Couture collections to curate your wardrobe.
            </p>
            <SheetClose
              render={
                <Link
                  href="/shop"
                  className="text-micro mt-2 text-ink underline decoration-gold underline-offset-8 outline-none transition-colors hover:text-smoke focus-visible:ring-1 focus-visible:ring-ring"
                />
              }
            >
              Browse silk collection
            </SheetClose>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6">
            <ul className="divide-y divide-line">
              {cartEntries.map((entry) => (
                <li key={`${entry.id}-${entry.size}-${entry.color}`} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${entry.product.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-mist outline-none border border-line"
                  >
                    <Image
                      src={entry.product.image}
                      alt={entry.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium">
                        {entry.product.category}
                      </p>
                      <Link
                        href={`/product/${entry.product.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink line-clamp-1 hover:text-smoke transition-colors"
                      >
                        {entry.product.name}
                      </Link>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-smoke">
                        <span>Size: <strong className="text-ink">{entry.size}</strong></span>
                        {entry.color && (
                          <span>Color: <strong className="text-ink">{entry.color}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-line bg-white">
                        <button
                          type="button"
                          onClick={() => bag.updateQuantity(entry.id, entry.size, entry.quantity - 1)}
                          className="grid size-6 place-items-center text-ink hover:bg-mist transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={10} weight="bold" />
                        </button>
                        <span className="w-6 text-center text-[11px] font-medium text-ink">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => bag.updateQuantity(entry.id, entry.size, entry.quantity + 1)}
                          className="grid size-6 place-items-center text-ink hover:bg-mist transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} weight="bold" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-[13px] font-medium tracking-[0.04em] text-ink">
                          {formatUsd(entry.product.price * entry.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => bag.remove(entry.id, entry.size)}
                          className="text-smoke hover:text-destructive transition-colors p-1"
                          aria-label={`Remove ${entry.product.name}`}
                        >
                          <Trash size={14} weight="light" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mandatory Product Recommendations Section */}
            {suggestedProducts.length > 0 && (
              <div className="mt-6 border-t border-line pt-5 pb-4">
                <p className="text-micro text-ink font-semibold uppercase tracking-[0.16em]">
                  Recommended Atelier Additions
                </p>
                <p className="mt-1 text-[11px] text-smoke">
                  Curated luxury pairings for your outfit
                </p>

                <div className="mt-3 flex flex-col gap-3">
                  {suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between border border-line bg-mist/50 p-2.5 transition-colors hover:bg-mist"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="relative aspect-square w-12 shrink-0 overflow-hidden bg-cream border border-line">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-ink line-clamp-1 break-words">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-gold font-medium">
                            {formatUsd(p.price)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => quickAddSuggestion(p.id)}
                        className="inline-flex items-center gap-1 shrink-0 text-[10px] uppercase font-semibold tracking-wider text-ink hover:text-gold transition-colors ml-2 px-2 py-1 border border-line bg-white whitespace-nowrap"
                      >
                        <PlusCircle size={13} weight="bold" />
                        <span>Quick Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {cartEntries.length > 0 && (
          <SheetFooter className="border-t border-line bg-ivory p-4 sm:p-6">
            <div className="flex items-center justify-between text-[13px] uppercase tracking-[0.14em] text-ink font-medium">
              <span>Estimated Subtotal</span>
              <span className="font-semibold text-base">{formatUsd(subtotal)}</span>
            </div>
            <p className="text-[11px] text-smoke">
              Taxes and complimentary express shipping calculated at checkout.
            </p>
            <SheetClose
              render={
                <Button
                  render={<Link href="/checkout" />}
                  className="h-12 w-full uppercase tracking-[0.2em] font-medium text-xs bg-ink text-ivory hover:bg-gold transition-colors"
                />
              }
            >
              Proceed to Checkout
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
