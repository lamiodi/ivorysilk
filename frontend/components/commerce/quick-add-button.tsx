"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { bag } from "@/lib/commerce-store";
import { cn } from "@/lib/utils";

const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL"];

export function QuickAddButton({
  id,
  name,
  sizes = DEFAULT_SIZES,
  variant = "bar",
  className,
}: {
  id: string;
  name: string;
  sizes?: string[];
  /** "bar" spans card bottom; "inline" is standard button. */
  variant?: "bar" | "inline";
  className?: string;
}) {
  const [showSizes, setShowSizes] = useState(false);

  const handleSelectSize = (size: string) => {
    bag.addItem(id, size);
    toast.success(`Added size ${size} to your bag`, { description: name });
    setShowSizes(false);
  };

  if (showSizes) {
    return (
      <div className="flex w-full items-center justify-center gap-1 bg-ivory/95 py-2 px-2 backdrop-blur-sm border-t border-line">
        <span className="text-[10px] text-smoke font-medium mr-1 uppercase tracking-wider">Select Size:</span>
        {sizes.map((sz) => (
          <button
            key={sz}
            type="button"
            onClick={() => handleSelectSize(sz)}
            className="text-[11px] font-semibold px-2 py-1 bg-white hover:bg-ink hover:text-ivory text-ink border border-line transition-colors cursor-pointer"
          >
            {sz}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Button onClick={() => setShowSizes(true)} className={cn("h-11 px-8 uppercase tracking-widest text-xs", className)}>
        Quick Add
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowSizes(true)}
      aria-label={`Quick add ${name} to bag`}
      className={cn(
        "text-micro w-full cursor-pointer bg-ivory/95 py-3 text-ink backdrop-blur-sm transition-colors duration-200 hover:bg-ink hover:text-ivory focus-visible:outline-2 focus-visible:outline-ring uppercase tracking-[0.18em]",
        className,
      )}
    >
      Quick Add +
    </button>
  );
}
