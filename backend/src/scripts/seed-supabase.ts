import { getSupabaseClient } from "../config/supabase";
import { collections } from "../data/collections";
import { products } from "../data/products";

async function seedSupabase() {
  console.log("🌱 Direct Supabase Data Seeding Script initialized...");
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.log("ℹ️ No active live Supabase credentials configured in .env.");
    console.log("👉 To seed a live Supabase database, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env!");
    return;
  }

  // 1. Seed Collections into Supabase
  console.log("Pushing collections to Supabase...");
  for (const c of collections) {
    const { error } = await supabase.from("collections").upsert({
      slug: c.slug,
      name: c.name,
      tagline: c.tagline,
      description: c.description,
      image: c.image,
    }, { onConflict: "slug" });

    if (error) console.error(`Error inserting collection ${c.name}:`, error.message);
  }

  // 2. Seed Products into Supabase
  console.log("Pushing products to Supabase...");
  for (const p of products) {
    const { error } = await supabase.from("products").upsert({
      slug: p.slug,
      name: p.name,
      creator: p.creator,
      category: p.category,
      collection_name: p.collectionName,
      fabric: p.fabric,
      sizes: p.sizes,
      price: p.price,
      compare_at_price: p.compareAtPrice,
      rating: p.rating,
      review_count: p.reviewCount,
      is_bestseller: p.isBestseller || false,
      is_new: p.isNew || false,
      featured: p.featured || false,
      short_description: p.shortDescription,
      description: p.description,
      features: p.features,
      includes: p.includes || [],
      care: p.care || [],
      fit: p.fit,
      model_info: p.modelInfo,
      image: p.image,
      hover_image: p.hoverImage,
      gallery: p.gallery,
      colors: p.colors,
    }, { onConflict: "slug" });

    if (error) console.error(`Error inserting product ${p.name}:`, error.message);
  }

  console.log("✨ Supabase seeding successfully completed!");
}

seedSupabase().catch(console.error);
