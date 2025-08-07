// app/products/page.tsx

import Storyblok from "@/lib/storyblok";
import ProductCards from "@/components/ProductCards";

interface Product {
  name: string;
  Price: string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  slug: string;
}

interface StoryblokStory {
  content: Product;
  slug: string;
}

export default async function ProductsPage() {
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "products/",
    version: "published",
  });

  const stories: StoryblokStory[] = data.stories;

  // Include slug in each product
  const products: Product[] = stories.map((story) => ({
    ...story.content,
    slug: story.slug,
  }));

  return <ProductCards products={products} />;
}
