import { Star } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/** Five-star display with fractional fill via gold/star layering. */
export function RatingStars({
  rating,
  className,
  size = 13,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          weight={rating >= index + 0.75 ? "fill" : "light"}
          aria-hidden
          className={rating >= index + 0.75 ? "text-gold" : "text-stone"}
        />
      ))}
    </span>
  );
}
