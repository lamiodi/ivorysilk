"use client";

import { Heart, MagnifyingGlass, ShoppingBag } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { SearchDialog } from "@/features/search/components/search-dialog";
import {
  useBagItems,
  useStoredCollection,
  wishlist,
} from "@/lib/commerce-store";
import { cn } from "@/lib/utils";
import { BagDrawer } from "./bag-drawer";

const iconButtonClass =
  "group relative flex h-10 items-center justify-center gap-2 px-2 text-ink transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-ring cursor-pointer sm:px-2.5";

function CountChip({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="grid size-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-ivory shadow-xs">
      <span className="sr-only">, </span>
      {count}
      <span className="sr-only"> items</span>
    </span>
  );
}

export function HeaderSearchButton({ className }: { className?: string }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label="Search the catalog"
        className={cn(
          "group flex items-center gap-3 border border-line bg-white/70 px-3.5 py-2 text-left text-smoke transition-all hover:border-ink hover:bg-white hover:text-ink cursor-pointer",
          className,
        )}
      >
        <MagnifyingGlass
          size={16}
          weight="light"
          aria-hidden
          className="text-smoke transition-colors group-hover:text-ink"
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
          Search catalog...
        </span>
        <kbd className="hidden rounded-none border border-line bg-mist px-1.5 py-0.5 text-[9px] font-mono text-stone lg:inline-block">
          ⌘K
        </kbd>
      </button>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

export function HeaderActions() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const wishlistIds = useStoredCollection(wishlist);
  const bagItems = useBagItems();

  const totalQuantity = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Mobile Search Icon */}
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label="Search the catalog"
        className={cn(iconButtonClass, "md:hidden")}
      >
        <MagnifyingGlass
          size={20}
          weight="light"
          aria-hidden
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* Wishlist Action */}
      <Link
        href="/wishlist"
        aria-label={`Wishlist, ${wishlistIds.length} saved`}
        className={cn(iconButtonClass)}
      >
        <div className="relative">
          <Heart
            size={20}
            weight="light"
            aria-hidden
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1.5 -right-2">
              <CountChip count={wishlistIds.length} />
            </span>
          )}
        </div>
        <span className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-smoke group-hover:text-ink lg:inline-block">
          Saved {wishlistIds.length > 0 && `(${wishlistIds.length})`}
        </span>
      </Link>

      {/* Shopping Bag Action */}
      <button
        type="button"
        onClick={() => setBagOpen(true)}
        aria-label={`Shopping bag, ${totalQuantity} items`}
        className={cn(
          iconButtonClass,
          "border border-line bg-white/70 px-2.5 py-2 shadow-xs hover:border-gold hover:bg-white sm:px-3.5 transition-all",
        )}
      >
        <div className="relative">
          <ShoppingBag
            size={19}
            weight="light"
            aria-hidden
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {totalQuantity > 0 && (
            <span className="absolute -top-1.5 -right-2">
              <CountChip count={totalQuantity} />
            </span>
          )}
        </div>
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-ink sm:inline-block">
          Bag {totalQuantity > 0 ? `(${totalQuantity})` : ""}
        </span>
      </button>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <BagDrawer open={bagOpen} onOpenChange={setBagOpen} />
    </div>
  );
}
