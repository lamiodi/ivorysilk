"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-[11px] font-medium uppercase tracking-[0.14em] text-smoke underline decoration-line underline-offset-4 hover:text-ink transition-colors cursor-pointer">
        Size Guide & Fit
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-ivory border-line">
        <DialogHeader className="border-b border-line pb-4">
          <DialogTitle className="font-display text-2xl font-light tracking-tight text-ink">
            Atelier Size Guide
          </DialogTitle>
          <DialogDescription className="text-xs text-smoke mt-1">
            All Ivory Silk garments are tailored according to standard European sizing. Use body measurements below to find your perfect fit.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-line text-smoke uppercase tracking-wider text-[10px]">
                <th className="py-2 px-3 font-semibold">Size</th>
                <th className="py-2 px-3 font-semibold">Bust (in / cm)</th>
                <th className="py-2 px-3 font-semibold">Waist (in / cm)</th>
                <th className="py-2 px-3 font-semibold">Hips (in / cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-gold">XS (EU 34)</td>
                <td className="py-2.5 px-3">32&Prime; / 81 cm</td>
                <td className="py-2.5 px-3">25&Prime; / 63 cm</td>
                <td className="py-2.5 px-3">35&Prime; / 89 cm</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-gold">S (EU 36)</td>
                <td className="py-2.5 px-3">34&Prime; / 86 cm</td>
                <td className="py-2.5 px-3">27&Prime; / 68 cm</td>
                <td className="py-2.5 px-3">37&Prime; / 94 cm</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-gold">M (EU 38)</td>
                <td className="py-2.5 px-3">36&Prime; / 91 cm</td>
                <td className="py-2.5 px-3">29&Prime; / 73 cm</td>
                <td className="py-2.5 px-3">39&Prime; / 99 cm</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-gold">L (EU 40)</td>
                <td className="py-2.5 px-3">38.5&Prime; / 98 cm</td>
                <td className="py-2.5 px-3">31.5&Prime; / 80 cm</td>
                <td className="py-2.5 px-3">41.5&Prime; / 105 cm</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-gold">XL (EU 42)</td>
                <td className="py-2.5 px-3">41&Prime; / 104 cm</td>
                <td className="py-2.5 px-3">34&Prime; / 86 cm</td>
                <td className="py-2.5 px-3">44&Prime; / 112 cm</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 rounded-none bg-mist p-4 text-[11px] leading-relaxed text-smoke border border-line">
            <strong className="text-ink uppercase tracking-wider block mb-1">Tailored Fitting Advice</strong>
            If you are between sizes, we recommend selecting the larger size for fluid silk drape, or consulting our master tailors via Concierge.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
