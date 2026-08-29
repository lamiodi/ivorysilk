import { cn } from "@/lib/utils";

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function Price({
  price,
  compareAtPrice,
  className,
}: {
  price: number;
  compareAtPrice?: number;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-baseline gap-2 text-[12px] tracking-[0.08em] text-ink",
        className,
      )}
    >
      <span>{formatUsd(price)}</span>
      {compareAtPrice ? (
        <s className="text-smoke">
          <span className="sr-only">Original price:</span>
          {formatUsd(compareAtPrice)}
        </s>
      ) : null}
    </p>
  );
}
