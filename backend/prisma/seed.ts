import { PrismaClient } from "@prisma/client";
import { collections } from "../src/data/collections";
import { products } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Ivory Silk Production Database Seeding...");

  // Seed Collections
  for (const col of collections) {
    await prisma.collection.upsert({
      where: { slug: col.slug },
      update: {
        name: col.name,
        tagline: col.tagline,
        description: col.description,
        image: col.image,
        featured: col.featured,
      },
      create: {
        id: col.id,
        slug: col.slug,
        name: col.name,
        tagline: col.tagline,
        description: col.description,
        image: col.image,
        featured: col.featured,
      },
    });
  }
  console.log(`✅ Seeded ${collections.length} Collections.`);

  // Seed Products
  for (const prod of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        category: prod.category,
        collectionName: prod.collectionName || null,
        fabric: prod.fabric,
        sizes: prod.sizes.join(","),
        price: prod.price,
        compareAtPrice: prod.compareAtPrice || null,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        isBestseller: prod.isBestseller || false,
        isNew: prod.isNew || false,
        featured: prod.featured || false,
        shortDescription: prod.shortDescription,
        description: prod.description,
        features: JSON.stringify(prod.features),
        includes: JSON.stringify(prod.includes || []),
        care: JSON.stringify(prod.care || []),
        fit: prod.fit || null,
        modelInfo: prod.modelInfo || null,
        image: prod.image,
        hoverImage: prod.hoverImage,
        gallery: JSON.stringify(prod.gallery),
      },
      create: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        creator: prod.creator,
        category: prod.category,
        collectionName: prod.collectionName || null,
        fabric: prod.fabric,
        sizes: prod.sizes.join(","),
        price: prod.price,
        compareAtPrice: prod.compareAtPrice || null,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        isBestseller: prod.isBestseller || false,
        isNew: prod.isNew || false,
        featured: prod.featured || false,
        shortDescription: prod.shortDescription,
        description: prod.description,
        features: JSON.stringify(prod.features),
        includes: JSON.stringify(prod.includes || []),
        care: JSON.stringify(prod.care || []),
        fit: prod.fit || null,
        modelInfo: prod.modelInfo || null,
        image: prod.image,
        hoverImage: prod.hoverImage,
        gallery: JSON.stringify(prod.gallery),
      },
    });

    // Seed Colors for Product
    await prisma.productColor.deleteMany({ where: { productId: createdProduct.id } });
    for (const color of prod.colors) {
      await prisma.productColor.create({
        data: {
          productId: createdProduct.id,
          name: color.name,
          hex: color.hex,
        },
      });
    }
  }
  console.log(`✅ Seeded ${products.length} Products and Color swatches.`);
  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Database Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
