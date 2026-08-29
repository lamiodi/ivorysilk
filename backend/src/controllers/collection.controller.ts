import { Request, Response } from "express";
import { collections } from "../data/collections";
import { products } from "../data/products";

export class CollectionController {
  static async getCollections(_req: Request, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        count: collections.length,
        data: collections,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch collections",
        error: (error as Error).message,
      });
    }
  }

  static async getCollectionBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const collection = collections.find((c) => c.slug === slug);

      if (!collection) {
        return res.status(404).json({
          success: false,
          message: `Collection '${slug}' not found`,
        });
      }

      const collectionProducts = products.filter(
        (p) => p.collectionName?.toLowerCase() === collection.name.toLowerCase(),
      );

      return res.status(200).json({
        success: true,
        data: {
          ...collection,
          products: collectionProducts,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch collection details",
        error: (error as Error).message,
      });
    }
  }
}
