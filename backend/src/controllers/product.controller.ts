import { Request, Response } from "express";
import { getSupabaseClient } from "../config/supabase";
import { products as mockProducts } from "../data/products";

export class ProductController {
  /**
   * GET /api/products
   * Queries Supabase directly or falls back to mock dataset
   */
  static async getProducts(req: Request, res: Response) {
    try {
      const { category, collection, q, sort } = req.query;
      const supabase = getSupabaseClient();

      if (supabase) {
        let query = supabase.from("products").select("*");

        if (category && typeof category === "string" && category !== "All") {
          query = query.ilike("category", category);
        }
        if (collection && typeof collection === "string" && collection !== "All") {
          query = query.ilike("collection_name", collection);
        }
        if (q && typeof q === "string") {
          query = query.or(`name.ilike.%${q}%,short_description.ilike.%${q}%`);
        }
        if (sort === "price-asc") {
          query = query.order("price", { ascending: true });
        } else if (sort === "price-desc") {
          query = query.order("price", { ascending: false });
        } else if (sort === "newest") {
          query = query.order("is_new", { ascending: false });
        }

        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          return res.status(200).json({
            success: true,
            source: "supabase",
            count: data.length,
            data,
          });
        }
      }

      // Fallback for demonstration mode
      let result = [...mockProducts];

      if (category && typeof category === "string" && category !== "All") {
        result = result.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase(),
        );
      }

      if (collection && typeof collection === "string" && collection !== "All") {
        result = result.filter(
          (p) => p.collectionName?.toLowerCase() === collection.toLowerCase(),
        );
      }

      if (q && typeof q === "string") {
        const queryStr = q.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(queryStr) ||
            p.shortDescription.toLowerCase().includes(queryStr) ||
            p.fabric.toLowerCase().includes(queryStr),
        );
      }

      if (sort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === "newest") {
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      return res.status(200).json({
        success: true,
        source: "mock_demo",
        count: result.length,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve products",
        error: (error as Error).message,
      });
    }
  }

  /**
   * GET /api/products/:slug
   */
  static async getProductBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const supabase = getSupabaseClient();

      if (supabase) {
        const { data: product, error } = await supabase
          .from("products")
          .select("*")
          .or(`slug.eq.${slug},id.eq.${slug}`)
          .single();

        if (!error && product) {
          const { data: related } = await supabase
            .from("products")
            .select("*")
            .eq("category", product.category)
            .neq("id", product.id)
            .limit(4);

          return res.status(200).json({
            success: true,
            source: "supabase",
            data: {
              ...product,
              related: related || [],
            },
          });
        }
      }

      // Fallback
      const product = mockProducts.find((p) => p.slug === slug || p.id === slug);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with identifier '${slug}' not found`,
        });
      }

      const related = mockProducts
        .filter((p) => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

      return res.status(200).json({
        success: true,
        source: "mock_demo",
        data: {
          ...product,
          related,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching product details",
        error: (error as Error).message,
      });
    }
  }
}
