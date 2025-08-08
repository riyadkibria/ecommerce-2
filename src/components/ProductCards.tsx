import AllProductCard from "./AllProductCard";
import Link from "next/link";

interface Product {
  id?: string; // optional but useful for cart identification
  name: string;
  price: string;
  image: string;
  sizes: string[];
  colors: string[];
  Category: string;
  description: string;
  slug: string; // unique id
}

export default function ProductCards({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.slug} href={`/products/${product.slug}`}>
          <AllProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
