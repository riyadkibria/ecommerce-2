"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, LogIn, LogOut, Box } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import NavIcons from "@/components/NavIcons";
import CartModal from "@/components/CartModal";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const handleCartOpen = () => {
    setCartOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-40 bg-white/98 backdrop-blur-2xl shadow-sm border-b border-neutral-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-18">
            <Link
              href="/"
              className="text-2xl font-light bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent hover:from-neutral-800 hover:to-neutral-600 transition-all duration-300 tracking-wide"
            >
              MyStore
            </Link>

            <div className="hidden lg:flex flex-grow max-w-2xl mx-12">
              <SearchBar />
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <ul className="flex items-center space-x-2">
                <li>
                  <Link
                    href="/products"
                    className="px-5 py-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-300 font-medium tracking-wide border border-transparent hover:border-neutral-200"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleCartOpen}
                    className="px-5 py-2.5 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-300 font-medium tracking-wide border border-transparent hover:border-neutral-200"
                  >
                    Cart
                  </button>
                </li>
                <li>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition duration-300 font-semibold shadow-md"
                    >
                      {loading ? "Signing out..." : "Logout"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setLoginOpen(true)}
                      className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition duration-300 font-semibold shadow-md"
                    >
                      Login
                    </button>
                  )}
                </li>
              </ul>
              <div className="ml-6 pl-6 border-l border-neutral-200 flex items-center gap-4">
                {user && (
                  <div className="hidden lg:flex items-center gap-2 text-sm text-neutral-600">
                    <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">Hi, {getUserDisplayName()}</span>
                  </div>
                )}
                <NavIcons onCartClick={handleCartOpen} />
              </div>
            </div>

            {/* Mobile menu buttons */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Toggle search"
                className="p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-300 border border-transparent hover:border-neutral-200"
              >
                <Search size={20} />
              </button>
              <div className="flex items-center">
                <NavIcons onCartClick={handleCartOpen} />
              </div>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-300 border border-transparent hover:border-neutral-200"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="md:hidden lg:hidden pb-5 pt-3 border-t border-neutral-100 animate-in slide-in-from-top-2 duration-300">
              <SearchBar />
            </div>
          )}
        </div>

        {/* Fullscreen mobile menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col p-6 md:hidden overflow-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold tracking-wide">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-neutral-100"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-base">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-neutral-700 hover:text-neutral-900"
              >
                <Box size={20} />
                Products
              </Link>

              <button
                onClick={() => {
                  handleCartOpen();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 text-neutral-700 hover:text-neutral-900"
              >
                <ShoppingCart size={20} />
                Cart
              </button>

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  disabled={loading}
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200"
                >
                  <LogOut size={20} />
                  {loading ? "Signing out..." : "Logout"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-200"
                >
                  <LogIn size={20} />
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </nav>

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={(id, qty) => console.log("Update", id, qty)}
        onRemoveItem={(id) => console.log("Remove", id)}
        onCheckout={() => console.log("Checkout")}
      />

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
