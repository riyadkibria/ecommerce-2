interface ProductImagesProps {
  mainImage: string;
  thumbnails?: string[]; // Optional
}

export default function ProductImages({ mainImage, thumbnails = [] }: ProductImagesProps) {
  return (
    <div className="w-full md:w-96 flex flex-col gap-6">
      {/* Main product image */}
      <div className="bg-zinc-100 rounded-2xl aspect-square overflow-hidden">
        <img src={mainImage} alt="Main Product" className="w-full h-full object-cover" />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2.5">
        {thumbnails.map((thumb, index) => (
          <div key={index} className="w-20 h-28 bg-zinc-100 rounded overflow-hidden">
            <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
