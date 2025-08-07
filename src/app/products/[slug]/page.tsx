import Storyblok from "@/lib/storyblok";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import { StoryblokProduct } from "@/types/storyblok";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    console.log("🟡 Starting fetch for slug:", slug);

    // 1. Fetch the current product
    const response = await Storyblok.get(`cdn/stories/products/${slug}`, {
      version: "published",
    });

    const content = response.data.story.content;
    console.log("✅ Fetched product content:", content);

    const currentCategory = content.category?.cached_url?.replace("category/", "");
    console.log("📁 Current category slug:", currentCategory);

    const product = {
      name: content.name ?? "",
      price: content.price?.toString() ?? "0",
      image: content.image,
      sizes: content.sizes || [],
      colors: content.colors || [],
      Category: content.category?.cached_url || "",
      description: content.description || "",
      thumbnails: content.thumbnails || [],
      slug: slug,
    };

    // 2. Fetch all products
    const allProductsRes = await Storyblok.get("cdn/stories", {
      starts_with: "products/",
      version: "published",
      per_page: 100, // optional: increase page size to get more products
    });

    const allProducts = allProductsRes.data.stories as StoryblokProduct[];
    console.log("📦 Total products fetched:", allProducts.length);

    // 3. Filter similar products
    const similarProducts = allProducts.filter((p) => {
      const productCat = p.content?.category?.cached_url?.replace("category/", "");
      const isSimilar = p.slug !== slug && productCat === currentCategory;
      console.log(`🔍 Comparing "${p.slug}" category: ${productCat} → Match: ${isSimilar}`);
      return isSimilar;
    });

    console.log("🧩 Similar products found:", similarProducts.map((p) => p.slug));

    // 4. Return layout
    return <ProductDetailLayout product={product} similarProducts={similarProducts} />;
  } catch (error) {
    console.error("❌ Error in ProductDetailPage:", error);
    return (
      <div className="p-4 text-red-500">
        Failed to load product details.
      </div>
    );
  }
}
