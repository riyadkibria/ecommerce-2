import HomeLayout from "@/components/HomeLayout";
import CategoryList from "@/components/CategoryList";
import FeaturedProduct from "@/components/FeaturedProduct"; // ✅ Imported
import Storyblok from "@/lib/storyblok";
import LatestProducts from "@/components/LatestProducts";

interface StoryblokProduct {
  uuid: string;
  content: {
    name: string;
    Price: string | number;
    image: string | { filename: string };
  };
}

export default async function HomePage() {
  const { data } = await Storyblok.get("cdn/stories", {
    starts_with: "products/",
    version: "published",
  });

  const products: StoryblokProduct[] = data.stories;

  const getImageUrl = (img: string | { filename: string }) => {
    const raw = typeof img === "string" ? img : img?.filename || "";
    return raw.startsWith("//") ? "https:" + raw : raw;
  };

  return (
    <HomeLayout>

      {/* 🗂 Category List */}
      <CategoryList />

      {/* 🌟 Featured Products */}
      <FeaturedProduct /> {/* ✅ Safe and scalable */}

      {/* 🌟 Latest Products */}
      <LatestProducts /> {/* ✅ Safe and scalable */}

    </HomeLayout>
  );
}
