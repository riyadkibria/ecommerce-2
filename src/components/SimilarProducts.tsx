import ProductCard from "@/components/ProductCard";
import { StoryblokProduct } from "@/types/storyblok"; // Adjust path accordingly

export default function SimilarProducts({ products }: { products: StoryblokProduct[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          // Determine image URL string safely
          const imageUrl =
            typeof product.content.image === "string"
              ? product.content.image.startsWith("//")
                ? `https:${product.content.image}`
                : product.content.image
              : product.content.image?.filename
              ? `https:${product.content.image.filename}`
              : "";

          return (
            <ProductCard
               key={product.slug}
               name={product.content.name ?? "Unnamed Product"}
               price={Number(product.content.price) || 0}
               image={imageUrl}
              slug={product.slug}
/>
          );
        })}
      </div>
    </section>
  );
}
