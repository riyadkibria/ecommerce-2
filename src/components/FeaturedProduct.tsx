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

export default async function FeaturedProduct() {
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "featured-products",
    version: "published", // change to 'draft' for preview mode
  });
  const products: Product[] = data.stories;
  
  return (
    <section className="px-6 py-16 bg-gradient-to-b from-white via-neutral-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-500 bg-white/80 backdrop-blur-sm border border-neutral-100 px-4 py-1.5 rounded-full shadow-sm">
              Curated Selection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extralight text-neutral-900 mb-4 tracking-tight">
            Featured Products
          </h2>
          <p className="text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            Discover our handpicked collection of exceptional items
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-300 to-transparent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Premium Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => {
            const imageUrl = product.content.image.startsWith("//")
              ? "https:" + product.content.image
              : product.content.image;
            
            return (
              <div
                key={product.uuid}
                className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-200 transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Premium Image Container */}
                <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.content.name}
                    className="w-full h-full object-cover grayscale-[5%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Floating Price Badge */}
                  <div className="absolute top-5 right-5">
                    <div className="bg-white/95 backdrop-blur-xl border border-white/60 px-4 py-2 rounded-xl shadow-lg">
                      <span className="text-sm font-medium text-neutral-900 tracking-wide">
                        ${product.content.Price}
                      </span>
                    </div>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-5 left-5">
                    <div className="bg-neutral-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider">
                      Featured
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Premium Product Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-neutral-900 leading-tight tracking-wide line-clamp-2 group-hover:text-neutral-700 transition-colors duration-300">
                      {product.content.name}
                    </h3>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-gradient-to-r from-neutral-300 to-transparent rounded-full"></div>
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
                        Premium Quality
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium Action Area */}
                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-neutral-200 rounded-full"></div>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        Available
                      </span>
                    </div>
                    
                    <button 
                      className="group/btn flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-white bg-neutral-50 hover:bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-200 hover:border-neutral-900 transition-all duration-300 shadow-sm hover:shadow-lg"
                      aria-label={`View ${product.content.name}`}
                    >
                      <span className="tracking-wide">Explore</span>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Premium Card Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neutral-200/20 via-neutral-100/10 to-neutral-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
        
        {/* Premium Bottom Section */}
        <div className="text-center mt-16 pt-12 border-t border-neutral-100">
          <h3 className="text-2xl font-light text-neutral-900 tracking-wide mb-6">
            Explore Our Complete Collection
          </h3>
          <button className="group bg-neutral-900 text-white px-10 py-4 rounded-xl hover:bg-neutral-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-900">
            <div className="flex items-center gap-4">
              <span className="text-base font-medium tracking-wide uppercase">
                View All Featured
              </span>
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all duration-300">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
