"use client";

import { Minus, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import type { GarmentColor } from "@/features/products/types";
import { PurchaseActions } from "./purchase-actions";
import { SizeGuideModal } from "./size-guide-modal";
import { WishlistButton } from "./wishlist-button";

export function GarmentPurchaseOptions({
  id,
  name,
  sizes = ["XS", "S", "M", "L", "XL"],
  colors = [],
  modelInfo,
}: {
  id: string;
  name: string;
  sizes?: string[];
  colors?: GarmentColor[];
  fabric?: string;
  modelInfo?: string;
}) {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "S");
  const [selectedColor, setSelectedColor] = useState<string>(
    colors[0]?.name || "Ivory Cream",
  );
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="mt-6 flex flex-col gap-6 border-t border-line pt-6">
      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-[0.14em] text-smoke">
              Color: <strong className="text-ink font-semibold">{selectedColor}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            {colors.map((c) => {
              const isSelected = selectedColor === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={`group relative size-8 rounded-full border transition-all cursor-pointer ${
                    isSelected ? "ring-2 ring-ink ring-offset-2 border-transparent scale-110" : "border-line hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  <span className="sr-only">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-[0.14em] text-smoke">
            Size: <strong className="text-ink font-semibold">{selectedSize}</strong>
          </span>
          <SizeGuideModal />
        </div>
        <div className="grid grid-cols-5 gap-2 pt-1">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`h-11 border text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-ink text-ivory border-ink shadow-sm"
                    : "bg-white text-ink border-line hover:border-ink hover:bg-mist"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Model Info */}
      <div className="flex flex-col gap-3 py-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.14em] text-smoke">Quantity</span>
          <div className="flex items-center border border-line bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="grid size-9 place-items-center text-ink hover:bg-mist transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} weight="bold" />
            </button>
            <span className="w-8 text-center text-xs font-semibold text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="grid size-9 place-items-center text-ink hover:bg-mist transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} weight="bold" />
            </button>
          </div>
        </div>

        {modelInfo && (
          <span className="text-[11px] italic text-smoke sm:max-w-[200px] sm:text-right">
            Model: {modelInfo}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-stretch gap-3 pt-2">
        <div className="flex-1">
          <PurchaseActions
            id={id}
            name={name}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
          />
        </div>
        <WishlistButton
          id={id}
          name={name}
          variant="inline"
          className="size-12 self-start rounded-none border border-line"
        />
      </div>

      {/* Trust Guarantee */}
      <div className="flex flex-col gap-2 border-t border-line pt-4 text-[11px] text-smoke sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-gold">✓</span>
          <span className="min-w-0 break-words">Complimentary Express Shipping</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-gold">✓</span>
          <span className="min-w-0 break-words">30-Day Atelier Guarantee</span>
        </div>
      </div>
    </div>
  );
}
