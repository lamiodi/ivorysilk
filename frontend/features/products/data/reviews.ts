/**
 * Mock reviews. A fixed pool, assigned deterministically per product so
 * server and client renders always agree. Replaced by the reviews table
 * when Supabase lands.
 */

export type Review = {
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
};

const REVIEW_POOL: Review[] = [
  {
    author: "Elena M.",
    location: "Lisbon",
    rating: 5,
    date: "2026-07-22",
    title: "Worth every cent",
    body: "I have bought a lot of templates and most end up unused. This one was open in my workspace within the hour and client-facing by the evening. The naming and organization alone are worth the price.",
  },
  {
    author: "Tomiwa A.",
    location: "Lagos",
    rating: 5,
    date: "2026-07-10",
    title: "Quietly excellent",
    body: "Nothing about this shouts, and that is exactly why it works. My clients have started commenting on how considered everything feels. Setup took an afternoon, not a week.",
  },
  {
    author: "Charlotte R.",
    location: "London",
    rating: 4,
    date: "2026-06-28",
    title: "Beautiful, with a learning curve",
    body: "The quality is genuinely high and the documentation is thorough. Took me a day to make it fully mine, but the result looks like I hired a studio. Would buy again.",
  },
  {
    author: "Min-Jun P.",
    location: "Seoul",
    rating: 5,
    date: "2026-06-15",
    title: "The details hold up",
    body: "Zoom in as far as you like — the kerning, the spacing, the file naming, all of it is considered. Rare to find this level of finish in a digital download.",
  },
  {
    author: "Amara O.",
    location: "Accra",
    rating: 5,
    date: "2026-07-30",
    title: "Paid for itself immediately",
    body: "Used it in a client proposal two days after buying and won the work. The license terms are clear, the files are clean, and support answered my one question within hours.",
  },
  {
    author: "Sofia L.",
    location: "Mexico City",
    rating: 5,
    date: "2026-05-19",
    title: "Exactly as presented",
    body: "What you see in the previews is precisely what arrives — no surprises, no missing pieces. The included guide is written by someone who clearly uses this daily.",
  },
  {
    author: "Ingrid K.",
    location: "Copenhagen",
    rating: 4,
    date: "2026-06-03",
    title: "Restrained and reusable",
    body: "I appreciate that nothing here chases trends. I have reused it across three projects now and it adapts each time. One more variation would make it perfect.",
  },
  {
    author: "David N.",
    location: "Nairobi",
    rating: 5,
    date: "2026-07-05",
    title: "Studio quality, solo price",
    body: "This is the standard of work I expect from an agency deliverable, packaged so a one-person business can actually use it. Instant download worked flawlessly.",
  },
  {
    author: "Camille D.",
    location: "Paris",
    rating: 5,
    date: "2026-04-27",
    title: "Considered from end to end",
    body: "From the checkout to the download email to the files themselves, everything feels designed. It is rare that a digital product respects your time like this.",
  },
  {
    author: "Yusuf B.",
    location: "Istanbul",
    rating: 5,
    date: "2026-05-08",
    title: "My default now",
    body: "Bought one piece to test the quality, came back for three more. Consistent, calm, and clearly made by people who do this work themselves.",
  },
  {
    author: "Hannah S.",
    location: "Melbourne",
    rating: 4,
    date: "2026-06-19",
    title: "Genuinely useful",
    body: "Not decoration — a working tool. The guide saved me from two mistakes I definitely would have made. Docked one star only because I wanted more formats.",
  },
  {
    author: "Lucia F.",
    location: "Milan",
    rating: 5,
    date: "2026-07-14",
    title: "Elevated my whole presentation",
    body: "Clients notice. Two have asked which studio produces my materials. The answer is me, plus Ivory Silk. Superb finish on every file.",
  },
];

/** Simple string hash so review assignment survives restarts and SSR. */
function hash(input: string): number {
  let value = 0;
  for (let index = 0; index < input.length; index += 1) {
    value = (value * 31 + input.charCodeAt(index)) >>> 0;
  }
  return value;
}

/** Three deterministic reviews per product. */
export function getReviewsFor(productId: string, count = 3): Review[] {
  const start = hash(productId) % REVIEW_POOL.length;
  return Array.from(
    { length: count },
    (_, index) => REVIEW_POOL[(start + index) % REVIEW_POOL.length],
  );
}

/** Homepage social proof: three five-star voices from the pool. */
export function getTestimonials(): Review[] {
  return REVIEW_POOL.filter((review) => review.rating === 5).slice(0, 3);
}
