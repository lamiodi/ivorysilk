"use client";

import { Heart } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useStoredCollection, wishlist } from "@/lib/commerce-store";
import { cn } from "@/lib/utils";

export function WishlistButton({
  id,
  name,
  variant = "overlay",
  className,
}: {
  id: string;
  name: string;
  /** "overlay" floats on product imagery; "inline" sits in content flow. */
  variant?: "overlay" | "inline";
  className?: string;
}) {
  const ids = useStoredCollection(wishlist);
  const active = ids.includes(id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`
      }
      onClick={() => {
        wishlist.toggle(id);
        toast(active ? "Removed from wishlist" : "Saved to your wishlist", {
          description: active ? undefined : name,
        });
      }}
      className={cn(
        "grid size-8 cursor-pointer place-items-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ring",
        variant === "overlay" &&
          "bg-ivory/90 text-ink backdrop-blur-sm hover:bg-cream",
        variant === "inline" &&
          "border border-line text-ink hover:border-ink",
        active && "text-gold",
        className,
      )}
    >
      <Heart size={16} weight={active ? "fill" : "light"} aria-hidden />
    </button>
  );
}
