"use client";

import { useEffect, useState } from "react";
import Storyblok from "@/lib/ClientStoryblok";

interface SizeSelectorProps {
  slug: string; // e.g., "product-11"
}

export default function SizeSelector({ slug }: SizeSelectorProps) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const { data } = await Storyblok.get(`cdn/stories/products/${slug}`, {
          version: "published",
        });

        const storySizes = data.story.content.sizes || [];
        setSizes(storySizes);
      } catch (err) {
        console.error("Failed to fetch product sizes from Storyblok", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, [slug]);

  if (loading) return <p>Loading sizes...</p>;
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-poppins font-normal text-black leading-tight tracking-tight mb-2">
        Size
      </h2>
      <div className="flex gap-2.5 flex-wrap">
        {sizes.map((size) => (
          <div
            key={size}
            className="px-4 py-2.5 bg-neutral-200 text-black text-xl font-poppins rounded cursor-pointer capitalize"
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
}
