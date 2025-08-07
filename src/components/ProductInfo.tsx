import { useEffect, useState } from "react";
import ClientStoryblok from "@/lib/ClientStoryblok";

export default function ProductInfo({ slug }: { slug: string }) {
  const [product, setProduct] = useState<{ title: string; description: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log the token (note: this will print in browser console)
    console.log("Storyblok Token:", process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN);

    async function fetchData() {
      try {
        console.log(`Fetching product info for slug: ${slug}`);
        const { data } = await ClientStoryblok.get(`cdn/stories/products/${slug}`, {
          version: "published",
        });
        console.log("Storyblok response data:", data);

        const content = data.story.content;
        setProduct({
          title: content.name,
          description: content.description,
        });
        setError(null);
      } catch (err) {
        console.error("Failed to fetch product info:", err);
        setError("Failed to load product info.");
        setProduct(null);
      }
    }

    fetchData();
  }, [slug]);

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (!product) return <p>Loading product info...</p>;

  return (
    <div className="flex flex-col gap-6 max-w-full md:max-w-[870px]">
      <h1 className="text-3xl font-poppins font-normal text-black">{product.title}</h1>
      <p className="text-xl font-poppins font-normal text-black">{product.description}</p>
    </div>
  );
}
