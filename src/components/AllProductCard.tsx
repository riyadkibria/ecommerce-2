import Image from "next/image";

interface Product {
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
}

export default function AllProductCard({ product }: { product: Product }) {
  const imageUrl = product.image.startsWith("//")
    ? "https:" + product.image
    : product.image;

  return (
    <div className="relative overflow-hidden">
      {/* Main Card Container */}
      <div className="relative bg-gray-50/60 border border-gray-200/60 rounded-2xl shadow-sm p-3 sm:p-4 lg:p-6">
        
        {/* Image Container */}
        <div className="relative mb-3 sm:mb-4 lg:mb-6">
          <div className="relative w-full h-48 sm:h-64 lg:h-72 overflow-hidden rounded-lg sm:rounded-xl bg-gray-100">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
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
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700">${product.price}</span>
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

          {/* Attributes */}
          <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
            {/* Sizes */}
            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide min-w-[50px]">
                  Sizes:
                </span>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {Array.isArray(product.colors) && product.colors.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide min-w-[50px]">
                  Colors:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded-full"
                    >
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></div>
                      <span className="text-xs font-medium text-gray-500 capitalize">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 sm:pt-3 lg:pt-4 flex space-x-2 sm:space-x-3">
            <button className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-sm text-sm sm:text-base">
              Add to Cart
            </button>
            <button className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg sm:rounded-xl">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
