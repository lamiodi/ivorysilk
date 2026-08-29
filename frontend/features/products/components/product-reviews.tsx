import { RatingStars } from "@/components/commerce/rating-stars";
import { getReviewsFor } from "@/features/products/data/reviews";
import type { Product } from "@/features/products/types";

/** PDP reviews: summary line plus three deterministic voices. */
export function ProductReviews({ product }: { product: Product }) {
  const reviews = getReviewsFor(product.id);

  return (
    <section aria-labelledby="reviews-heading" className="border-t border-line py-12 lg:py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2
          id="reviews-heading"
          className="font-display text-2xl font-light tracking-tight text-ink lg:text-3xl"
        >
          Reviews
        </h2>
        <p className="flex items-center gap-2 text-[12px] tracking-[0.04em] text-smoke">
          <RatingStars rating={product.rating} />
          {product.rating.toFixed(1)} — {product.reviewCount} reviews
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-14">
        {reviews.map((review) => (
          <figure key={`${review.author}-${review.date}`} className="flex flex-col">
            <RatingStars rating={review.rating} size={12} />
            <blockquote className="mt-4 flex-1">
              <p className="text-[13px] font-medium tracking-[0.02em] text-ink">
                {review.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-smoke">
                {review.body}
              </p>
            </blockquote>
            <figcaption className="mt-4 text-[11px] tracking-[0.12em] uppercase text-stone">
              {review.author} — {review.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
