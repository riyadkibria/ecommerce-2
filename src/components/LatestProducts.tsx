import Storyblok from "@/lib/storyblok";

interface Product {
  uuid: string;
  name: string;
  slug: string;
  content: {
    name: string;
    Price: string;
    image: string;
    colors?: string[];
    sizes?: string[];
  };
}

export default async function LatestProducts() {
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "latest-products",
    version: "published",
  });
  const products: Product[] = data.stories;
  
  return (
    <section className="bg-gradient-to-b from-neutral-50 via-white to-neutral-50/50 py-12">
      {/* Premium Hero */}
      <div className="relative px-8 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.04),transparent_60%)]"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block mb-3">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 bg-white/80 backdrop-blur-sm border border-neutral-100 px-4 py-1.5 rounded-full shadow-sm">
              Premium Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-2 tracking-tight">
            Latest Products
          </h1>
          <p className="text-base text-neutral-600 mb-4 font-light">
            Handpicked luxury essentials
          </p>
          <div className="w-px h-4 bg-gradient-to-b from-neutral-300 to-transparent mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Premium Products Grid */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = product.content.image.startsWith("//")
              ? "https:" + product.content.image
              : product.content.image;
            
            return (
              <div key={product.uuid} className="group relative bg-white rounded-xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-200 transition-all duration-300">
                {/* Premium Image Container */}
                <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.content.name}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  
                  {/* Premium Price Tag */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-xl border border-white/60 px-4 py-2 rounded-lg shadow-lg">
                      <span className="text-sm font-medium text-neutral-900 tracking-wide">
                        ${product.content.Price}
                      </span>
                    </div>
                  </div>

                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Premium Product Details */}
                <div className="p-5 space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-neutral-900 leading-tight tracking-wide line-clamp-2">
                      {product.content.name}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-px bg-gradient-to-r from-neutral-300 to-transparent rounded-full"></div>
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                        Premium
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium Action Area */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-neutral-200 rounded-full"></div>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        In Stock
                      </span>
                    </div>
                    
                    <button 
                      className="group/btn flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-all duration-200"
                      aria-label={`View ${product.content.name}`}
                    >
                      <span className="tracking-wide">View</span>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Premium Bottom Section */}
        <div className="text-center mt-12 pt-10 border-t border-neutral-100">
          <h3 className="text-xl font-light text-neutral-900 tracking-wide mb-4">
            Discover Our Collection
          </h3>
          <button className="group bg-neutral-900 text-white px-8 py-3 rounded-lg hover:bg-neutral-800 shadow-lg hover:shadow-xl border border-neutral-900 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium tracking-wide uppercase">
                View All Products
              </span>
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-200">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
