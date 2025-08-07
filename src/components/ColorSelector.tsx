"use client";

import { useEffect, useState } from "react";
import Storyblok from "@/lib/ClientStoryblok";

interface ColorSelectorProps {
  slug: string;
}

const colorStyles: Record<string, { bg: string; text: string }> = {
  red: { bg: "bg-red-500", text: "text-white" },
  green: { bg: "bg-green-600", text: "text-neutral-50" },
  yellow: { bg: "bg-yellow-500", text: "text-stone-50" },
  blue: { bg: "bg-blue-500", text: "text-white" },
  black: { bg: "bg-black", text: "text-white" },
  white: { bg: "bg-white", text: "text-black border border-gray-300" },
};

export default function ColorSelector({ slug }: ColorSelectorProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { data } = await Storyblok.get(`cdn/stories/products/${slug}`, {
          version: "published",
        });

        const storyColors = data.story.content.colors || [];
        setColors(storyColors);
      } catch (err) {
        console.error("Failed to fetch product colors from Storyblok", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, [slug]);

  if (loading) return <p>Loading colors...</p>;
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-poppins font-normal text-black leading-tight tracking-tight mb-2">
        Color
      </h2>
      <div className="flex gap-2.5 flex-wrap">
        {colors.map((color) => {
          const style = colorStyles[color.toLowerCase()] || {
            bg: "bg-gray-300",
            text: "text-black",
          };

          return (
            <div
              key={color}
              className={`${style.bg} px-4 py-2.5 rounded cursor-pointer flex justify-center items-center`}
            >
              <span className={`text-xl font-poppins ${style.text} capitalize`}>
                {color}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
