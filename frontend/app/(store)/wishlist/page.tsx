import type { Metadata } from "next";
import { WishlistResults } from "@/features/products/components/wishlist-results";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Pieces you have saved for later. Stored on this device.",
};

export default function WishlistPage() {
  return (
    <div className="shell py-8 lg:py-12">
      <header className="border-b border-line pb-8 lg:pb-10">
        <h1 className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Wishlist
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
          Pieces you have saved for later. Your wishlist lives on this device —
          no account needed.
        </p>
      </header>
      <div className="mt-8 lg:mt-12">
        <WishlistResults />
      </div>
    </div>
  );
}
