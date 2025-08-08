"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart";

interface ProductProps {
  id?: string;       // optional if you want, but required by addToCart
  name: string;
  price: number;
  image: string;
  slug: string;
}

export default function ProductCard({ name, price, image, slug }: ProductProps) {
  const imageUrl = image.startsWith("//") ? "https:" + image : image;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    // Use slug as id here:
    addToCart({ id: slug, name, price, image: imageUrl });
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200 max-w-sm w-full mx-auto">
      <Link href={`/products/${slug}`}>
        <div className="aspect-w-4 aspect-h-3 mb-4 overflow-hidden rounded">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-700">${price}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
