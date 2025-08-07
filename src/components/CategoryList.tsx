import Link from "next/link";
import Storyblok from "@/lib/storyblok";
import { 
  FiShoppingBag, 
  FiStar, 
  FiZap, 
  FiHeart, 
  FiGift, 
  FiHome, 
  FiUsers, 
  FiCamera, 
  FiMusic, 
  FiBook, 
  FiGrid,
  FiTrendingUp,
  FiHeadphones,
  FiWatch,
  FiSmartphone,
  FiClock,
  FiArrowRight,
  FiSearch
} from 'react-icons/fi';
import { 
  MdSportsTennis, 
  MdDirectionsCar, 
  MdFlight, 
  MdCheckroom,
  MdPalette,
  MdCoffee,
  MdGames
} from 'react-icons/md';
import { IconType } from 'react-icons';

// Properly typed based on your Storyblok JSON
interface CategoryStory {
  name: string;
  slug: string;
  content: {
    Name?: string;
    Slug?: string;
  };
}

const getCategoryIcon = (category: string): IconType => {
  const iconMap: { [key: string]: IconType } = {
    headphone: FiHeadphones,
    headphones: FiHeadphones,
    tws: FiHeadphones,
    watch: FiWatch,
    smart: FiWatch,
    phone: FiSmartphone,
    smartphone: FiSmartphone,
    clock: FiClock,
    bag: FiShoppingBag,
    fashion: MdCheckroom,
    clothing: MdCheckroom,
    electronics: FiZap,
    tech: FiZap,
    home: FiHome,
    decor: FiHome,
    beauty: FiHeart,
    cosmetics: FiHeart,
    books: FiBook,
    fitness: MdSportsTennis,
    sports: MdSportsTennis,  
    automotive: MdDirectionsCar,
    travel: MdFlight,
    gifts: FiGift,
    jewelry: FiStar,
    art: MdPalette,
    coffee: MdCoffee,
    food: MdCoffee,
    photography: FiCamera,
    music: FiMusic,
    gaming: MdGames,
    lifestyle: FiHeart,
    family: FiUsers,
    trending: FiTrendingUp,
    default: FiGrid,
  };
  
  const key = Object.keys(iconMap).find((k) =>
    category.toLowerCase().includes(k)
  );
  return iconMap[key || "default"] || FiGrid;
};

export default async function CategoryList() {
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "category/",
    version: "published",
  });

  const categories: CategoryStory[] = data.stories;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-6 py-20">
        
        {/* Minimal Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-8">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Categories</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Shop by Category
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Curated collections for the modern lifestyle
          </p>
        </div>

        {/* Clean Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-20">
          {categories.map((category) => {
            const catName = category.content?.Name || category.name;
            const IconComponent = getCategoryIcon(catName);
            const slug = category.slug;

            return (
              <Link href={`/category/${slug}`} key={slug}>
                <div className="group bg-white hover:bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg cursor-pointer">
                  <div className="text-center space-y-6">
                    
                    {/* Icon Container */}
                    <div className="w-14 h-14 bg-gray-100 group-hover:bg-gray-900 rounded-xl flex items-center justify-center mx-auto">
                      <IconComponent className="text-gray-600 group-hover:text-white text-xl" />
                    </div>

                    {/* Category Name */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 capitalize tracking-wide">
                        {catName}
                      </h3>
                    </div>

                    {/* Subtle Arrow */}
                    <div className="opacity-0 group-hover:opacity-100">
                      <FiArrowRight className="text-gray-400 mx-auto text-sm" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Minimal CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Explore More Products
              </h2>
              <p className="text-gray-600 mb-10 font-light">
                Browse our complete collection of premium products
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search">
                  <button className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-xl">
                    <FiSearch className="text-lg" />
                    Browse All
                  </button>
                </Link>
                
                <Link href="/trending">
                  <button className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 font-medium px-8 py-4 rounded-xl">
                    <FiTrendingUp className="text-lg" />
                    Trending
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
