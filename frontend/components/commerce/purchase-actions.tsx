"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { bag } from "@/lib/commerce-store";

/**
 * PDP purchase block. Add to bag writes selected size and color to local storage.
 */
export function PurchaseActions({
  id,
  name,
  selectedSize,
  selectedColor,
  quantity = 1,
}: {
  id: string;
  name: string;
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
}) {
  const router = useRouter();

  const addToBag = () => {
    if (!selectedSize) {
      toast.error("Please select a garment size first");
      return;
    }
    bag.addItem(id, selectedSize, selectedColor, quantity);
    toast.success(`Added size ${selectedSize} to your bag`, { description: name });
  };

  const buyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a garment size first");
      return;
    }
    bag.addItem(id, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={buyNow}
        className="h-12 w-full rounded-none text-micro bg-ink text-ivory hover:bg-gold transition-colors tracking-[0.2em]"
      >
        Buy Now
      </Button>
      <Button
        variant="outline"
        onClick={addToBag}
        className="h-12 w-full rounded-none border-ink text-micro hover:bg-ink hover:text-ivory transition-colors tracking-[0.2em]"
      >
        Add to Bag
      </Button>
    </div>
  );
}
