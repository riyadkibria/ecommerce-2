export interface StoryblokProduct {
  slug: string;
  content: {
    name: string;
    price: string | number;
    image: string | { filename: string };
    sizes?: string[];
    colors?: string[];
    description?: string;
    thumbnails?: { filename: string }[];
    category?: {
      cached_url: string;
    };
  };
}
