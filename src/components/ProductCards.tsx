import AllProductCard from "./AllProductCard";
import Link from "next/link";

interface Product {
  name: string;
  Price: string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  slug: string; // ✅ Add slug here
}

export default function ProductCards({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <Link key={index} href={`/products/${product.slug}`}>
          <AllProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
