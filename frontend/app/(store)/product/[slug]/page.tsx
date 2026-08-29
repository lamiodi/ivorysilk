import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GarmentPurchaseOptions } from "@/components/commerce/garment-purchase-options";
import { Price } from "@/components/commerce/price";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { ProductGrid } from "@/components/commerce/product-grid";
import { RatingStars } from "@/components/commerce/rating-stars";
import { ProductFaq } from "@/features/products/components/product-faq";
import { ProductReviews } from "@/features/products/components/product-reviews";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/features/products/queries";

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: `${product.name} — Ivory Silk`, description: product.shortDescription };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image, product.hoverImage];

  return (
    <div className="shell py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.14em] text-smoke"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/shop"
              className="outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main PDP Grid */}
      <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          name={product.name}
          images={galleryImages}
        />

        <div className="flex flex-col lg:py-2">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <p className="text-micro font-semibold text-gold uppercase tracking-[0.2em]">
              {product.collection || "Atelier Collection"}
            </p>
            {product.fabric && (
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-smoke">
                {product.fabric}
              </span>
            )}
          </div>

          <h1 className="mt-2 font-display text-3xl font-light tracking-tight text-ink sm:text-[2.1rem] lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-smoke">
            <span>
              By <strong className="font-medium text-ink">{product.creator}</strong>
            </span>
            <span aria-hidden="true">•</span>
            <span>
              Category: <strong className="font-medium text-ink">{product.category}</strong>
            </span>
          </div>

          <a
            href="#reviews-heading"
            className="mt-3 flex w-fit items-center gap-2 outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <RatingStars rating={product.rating} />
            <span className="text-[11px] tracking-[0.06em] text-smoke">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </a>

          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            className="mt-5 text-xl font-medium"
          />

          <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke font-light">
            {product.shortDescription}
          </p>

          {/* Garment Interactive Options */}
          <GarmentPurchaseOptions
            id={product.id}
            name={product.name}
            sizes={product.sizes}
            colors={product.colors}
            fabric={product.fabric}
            modelInfo={product.modelInfo}
          />

          {/* What's Included */}
          {product.includes && product.includes.length > 0 && (
            <div className="mt-8 border-t border-line pt-6">
              <h2 className="text-micro text-ink">Atelier Packaging & Inclusions</h2>
              <ul className="mt-3 flex flex-col gap-2 text-[13px] leading-relaxed text-smoke">
                {product.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-gold">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Description & Features */}
      <section className="mt-16 grid gap-10 border-t border-line py-12 lg:mt-24 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div>
          <h2 className="text-micro text-smoke">Design Philosophy & Craft</h2>
          <p className="mt-5 max-w-xl font-display text-xl font-light leading-relaxed text-ink lg:text-2xl">
            {product.description}
          </p>
        </div>
        <div>
          <h2 className="text-micro text-smoke">Tailoring Specifications</h2>
          <ul className="mt-5 flex flex-col gap-3 text-[13px] leading-relaxed text-ink">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span aria-hidden="true" className="text-gold">
                  —
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Garment Care & Composition details */}
      <section className="grid gap-10 border-t border-line py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div>
          <h2 className="text-micro text-smoke">Fabric & Fit Profile</h2>
          <dl className="mt-5">
            {[
              ["Fabric", product.fabric || "100% Grade 6A Mulberry Silk"],
              ["Fit Silhouette", product.fit || "Tailored relaxed drape"],
              ["Model Sizing", product.modelInfo || "Model is 178cm wearing size S"],
              ["Shipping", "Complimentary express delivery & signature gift box"],
            ].map(([term, value]) => (
              <div
                key={term}
                className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-[12px] tracking-[0.04em] text-smoke">
                  {term}
                </dt>
                <dd className="text-[13px] font-medium text-ink sm:text-right sm:max-w-[60%]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-micro text-smoke">Garment Care Instructions</h2>
          <ul className="mt-5 flex flex-col gap-3 text-[13px] leading-relaxed text-smoke">
            {(product.care || [
              "Hand wash cold with silk detergent or dry clean",
              "Do not bleach or tumble dry",
              "Cool iron on reverse side using press cloth",
              "Store flat or on padded coat hanger",
            ]).map((careItem) => (
              <li key={careItem} className="flex gap-3">
                <span aria-hidden="true" className="text-gold">
                  —
                </span>
                {careItem}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Creator / House */}
      <section className="border-t border-line py-12 lg:py-16">
        <div className="flex max-w-2xl flex-col">
          <p className="text-micro text-smoke">The Atelier</p>
          <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-ink lg:text-3xl">
            {product.creator}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-smoke">
            An independent couture studio within the Ivory Silk collective. Every garment in
            their collection is handcrafted in small artisanal batches, using ethically sourced
            silk and traditional french-seam tailoring methods.
          </p>
          <Link
            href={`/shop?q=${encodeURIComponent(product.creator)}`}
            className="text-micro mt-6 inline-flex w-fit items-center text-ink underline decoration-line underline-offset-8 outline-none transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-ring"
          >
            Explore all pieces by {product.creator}
          </Link>
        </div>
      </section>

      <ProductReviews product={product} />
      <ProductFaq />

      {related.length > 0 && (
        <section className="border-t border-line py-12 lg:py-16">
          <h2 className="font-display text-2xl font-light tracking-tight text-ink lg:text-3xl">
            Complete the Look
          </h2>
          <div className="mt-8 lg:mt-10">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
