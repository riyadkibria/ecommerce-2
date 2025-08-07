import Storyblok from "@/lib/storyblok";
import ProductCard from "@/components/ProductCard";

interface StoryblokProduct {
  name: string;
  slug: string;
  content: {
    name: string;
    price: number;
    image: string;
    category: {
      id: string;
      url: string;
      linktype: string;
      fieldtype: string;
      cached_url: string;
    } | undefined;
  };
}

interface CategoryStory {
  name: string;
  slug: string;
  content: {
    Name: string;
    Slug: string;
    Description?: string;
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: categorySlug } = await params;
  
  try {
    // Fetch both products and categories
    const [productsResponse, categoryResponse] = await Promise.all([
      Storyblok.get("cdn/stories", {
        starts_with: "products/",
        version: "published",
      }),
      Storyblok.get("cdn/stories", {
        starts_with: "category/",
        version: "published",
      })
    ]);
    
    const allProducts: StoryblokProduct[] = productsResponse.data.stories;
    const categories: CategoryStory[] = categoryResponse.data.stories;
    
    // Find current category
    const currentCategory = categories.find(cat => 
      cat.slug === `category/${categorySlug}` || 
      cat.content.Slug === categorySlug
    );
    
    // Filter products by category
    const filteredProducts = allProducts.filter((product) => {
      const productCategory = product.content.category;
      
      // Check if category exists and has cached_url
      if (!productCategory || !productCategory.cached_url) {
        return false;
      }
      
      // Extract the category slug from cached_url (e.g., "category/tws" -> "tws")
      const categoryFromUrl = productCategory.cached_url.replace('category/', '');
      
      return categoryFromUrl.toLowerCase() === categorySlug.toLowerCase();
    });
    
    const categoryName = currentCategory?.content?.Name || categorySlug;
    
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {categoryName}
        </h1>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in the &quot;{categoryName}&quot; category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                name={product.content.name}
                price={product.content.price}
                image={product.content.image}
                slug={product.slug} //
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <div className="bg-red-100 p-4 rounded-lg">
          <p>Error loading data: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
