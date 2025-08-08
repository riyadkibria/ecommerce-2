"use client";

import { useCart } from "@/src/context/cart";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  // prevent body scroll when modal open (keep your existing useEffect for this)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform">
        {/* Header */}
        {/* ...keep header as is */}

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            // Empty cart UI as you have it
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 ...">
                    {/* Image */}
                    <div className="w-16 h-16 ...">
                      <img src={item.image} alt={item.name} className="..." />
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4>{item.name}</h4>
                      {/* color, size, price */}
                    </div>
                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <Minus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus />
                      </button>
                    </div>
                    {/* Remove */}
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order summary & checkout button */}
              {/* ...same as your current code, just use subtotal, tax, total */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
