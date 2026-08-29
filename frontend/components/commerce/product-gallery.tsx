"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * PDP gallery: primary image with a detail shot behind thumbnails. On
 * desktop, hovering the frame zooms gently toward the cursor. Reduced
 * motion keeps everything still.
 */
export function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");

  const trackCursor = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group relative aspect-[3/4] overflow-hidden bg-mist"
        onMouseMove={trackCursor}
      >
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={index === 0 ? name : `${name} — detail view`}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ transformOrigin: origin }}
            className={cn(
              "object-cover transition-all duration-500 ease-luxe md:motion-safe:group-hover:scale-[1.6]",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          className="-mx-1 flex gap-3 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={index === 0 ? "Main image" : "Detail image"}
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden bg-mist outline-none transition-opacity focus-visible:ring-1 focus-visible:ring-ring",
                active === index
                  ? "ring-1 ring-ink"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
