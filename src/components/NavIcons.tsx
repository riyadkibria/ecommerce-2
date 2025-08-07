"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface NavIconsProps {
  onCartClick?: () => void;
}

const NavIcons = ({ onCartClick }: NavIconsProps) => {
  return (
    <div className="text-gray-700 cursor-pointer">
      {/* If onCartClick is passed, call it; otherwise navigate to /cart */}
      {onCartClick ? (
        <ShoppingCart
          size={24}
          className="hover:text-black"
          onClick={onCartClick}
          aria-label="Open cart"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onCartClick();
          }}
        />
      ) : (
        <Link href="/cart" aria-label="Cart">
          <ShoppingCart size={24} className="hover:text-black" />
        </Link>
      )}
    </div>
  );
};

export default NavIcons;
