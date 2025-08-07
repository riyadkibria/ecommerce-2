import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  name: string;
  price: string | number;
  image: string;
  slug: string;
}

export default function ProductCard({ name, price, image, slug }: ProductProps) {
  const imageUrl = image.startsWith("//") ? "https:" + image : image;

  return (
    <Link href={`/products/${slug}`}>
      <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200 max-w-sm w-full mx-auto cursor-pointer">
        <div className="aspect-w-4 aspect-h-3 mb-4 overflow-hidden rounded">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-700">${price}</p>
        </div>
      </div>
    </Link>
  );
}
