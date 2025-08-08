"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id?: string; // optional but useful for cart identification
  name: string;
  price: number | string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
}

interface AllProductCardProps {
  product: Product;
  onAddToCart?: (product: Product & { size: string; color: string }) => void; // callback with selected options
}

export default function AllProductCard({ product, onAddToCart }: AllProductCardProps) {
  const imageUrl = product.image.startsWith("//")
    ? "https:" + product.image
    : product.image;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize || !selectedColor) {
      alert("Please select a size and a color.");
      return;
    }

    if (onAddToCart)
      onAddToCart({ ...product, size: selectedSize, color: selectedColor });
  };

  return (
    <div className="relative overflow-hidden cursor-pointer rounded-2xl shadow-sm bg-gray-50/60 border border-gray-200/60 p-3 sm:p-4 lg:p-6">
      {/* Image Container */}
      <div className="relative mb-3 sm:mb-4 lg:mb-6">
        <div className="relative w-full h-48 sm:h-64 lg:h-72 overflow-hidden rounded-lg sm:rounded-xl bg-gray-100">
          <Image src={imageUrl} alt={product.name} fill className="object-cover" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100/90 border border-gray-200/60 rounded-full shadow-sm">
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            {product.Category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
        {/* Title */}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h2>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700">
              ${product.price}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">$99.99</span>
          </div>
          <div className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-200 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
            Sale
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
          {product.description}
        </p>

        {/* Sizes Selection */}
        {product.sizes?.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide min-w-[50px]">
              Sizes:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md text-xs font-medium border ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors Selection */}
        {product.colors?.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide min-w-[50px]">
              Colors:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${
                    selectedColor === color
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-gray-50 text-gray-600"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="text-xs font-medium capitalize">{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 sm:pt-3 lg:pt-4 flex space-x-2 sm:space-x-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-sm text-sm sm:text-base"
            type="button"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg sm:rounded-xl"
            aria-label="Add to Wishlist"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
