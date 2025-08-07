// components/AddToCart.tsx
import { useState } from "react";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  function increment() {
    setQuantity((q) => q + 1);
  }

  function decrement() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      <button className="bg-zinc-600 rounded-lg px-10 py-3.5 text-neutral-50 text-2xl font-poppins whitespace-nowrap">
        Add to cart
      </button>
      <div className="flex items-center gap-2 sm:gap-1 w-48">
        <button
          onClick={increment}
          className="w-12 h-14 bg-stone-200 flex justify-center items-center text-2xl font-poppins"
        >
          +
        </button>
        <div className="w-12 h-14 flex justify-center items-center text-2xl font-poppins">
          {quantity}
        </div>
        <button
          onClick={decrement}
          className="w-12 h-14 bg-stone-200 flex justify-center items-center text-2xl font-poppins"
        >
          _
        </button>
      </div>
    </div>
  );
}
