"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import NavIcons from "@/components/NavIcons";
import CartModal from "@/components/CartModal";
import { LoginModal, useAuth } from "@/components/LoginModal"; // ✅ Fixed: Named import + useAuth hook

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeTimer, setWelcomeTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Get auth state
  const { user, loading, logout } = useAuth();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Show welcome message when user logs in
  useEffect(() => {
    if (user && !showWelcome) {
      setShowWelcome(true);
      // Clear any existing timer
      if (welcomeTimer) {
        clearTimeout(welcomeTimer);
      }
      // Set new timer to auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      setWelcomeTimer(timer);
    }
    
    // Clean up timer when user logs out
    if (!user && showWelcome) {
      setShowWelcome(false);
      if (welcomeTimer) {
        clearTimeout(welcomeTimer);
        setWelcomeTimer(null);
      }
    }

    // Cleanup timer on unmount
    return () => {
      if (welcomeTimer) {
        clearTimeout(welcomeTimer);
      }
    };
  }, [user]);

  // Manual close welcome message
  const handleCloseWelcome = () => {
    setShowWelcome(false);
    if (welcomeTimer) {
      clearTimeout(welcomeTimer);
      setWelcomeTimer(null);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setShowWelcome(false);
      setMenuOpen(false);
      if (welcomeTimer) {
        clearTimeout(welcomeTimer);
        setWelcomeTimer(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  // Cart handlers
  const handleCartOpen = () => {
    setCartOpen(true);
    setMenuOpen(false);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    console.log(`Update item ${id} to quantity ${quantity}`);
  };

  const handleRemoveItem = (id: string) => {
    console.log(`Remove item ${id}`);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    setCartOpen(false);
  };

  return (
    <>
      {/* Welcome Message */}
      {showWelcome && user && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-500">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg border border-green-400">
            <div className="flex items-center gap-3">
              <span className="text-lg">🎉</span>
              <span className="font-medium">Welcome back, {getUserDisplayName()}!</span>
              <button 
                onClick={handleCloseWelcome}
                className="ml-2 text-green-100 hover:text-white hover:bg-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-all duration-200"
                aria-label="Close welcome message"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="w-full fixed top-0 left-0 z-40 bg-white/98 backdrop-blur-2xl shadow-sm border-b border-neutral-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Main navbar row */}
          <div className="flex items-center justify-between h-18">
            {/* Premium Logo */}
            <Link 
              href="/" 
              className="text-2xl font-light bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent hover:from-neutral-800 hover:to-neutral-600 transition-all duration-300 tracking-wide"
            >
              MyStore
            </Link>

            {/* Desktop search bar */}
            <div className="hidden lg:flex flex-grow max-w-2xl mx-12">
              <SearchBar />
            </div>

            {/* Desktop navigation + icons */}
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
                      className="group relative px-6 py-2.5 text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 rounded-xl transition-all duration-500 font-semibold shadow-xl hover:shadow-2xl border border-red-500/50 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Signing out...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </>
                        )}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setLoginOpen(true)}
                      className="group relative px-6 py-2.5 text-white bg-gradient-to-r from-neutral-800 via-neutral-900 to-black hover:from-neutral-900 hover:via-black hover:to-neutral-800 rounded-xl transition-all duration-500 font-semibold shadow-xl hover:shadow-2xl border border-neutral-700/50 tracking-wide overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Login
                      </span>
                    </button>
                  )}
                </li>
              </ul>

              {/* Desktop Nav Icons */}
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

            {/* Mobile controls */}
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
      </nav>

      {/* Premium Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 via-white to-neutral-50/30" />
          <div className="relative flex flex-col items-center justify-center h-full space-y-8 text-neutral-900">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 p-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all duration-300 border border-neutral-200 shadow-lg"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-md px-8 mb-8">
              <SearchBar />
            </div>

            {/* User info in mobile menu */}
            {user && (
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-neutral-900">Hi, {getUserDisplayName()}!</p>
                  <p className="text-sm text-neutral-600">{user.email}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center space-y-6 text-center">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-light hover:text-neutral-600 transition-all duration-300 py-4 px-8 hover:bg-neutral-50 rounded-xl border border-transparent hover:border-neutral-200 tracking-wide"
              >
                Products
              </Link>
              <button
                onClick={handleCartOpen}
                className="text-2xl font-light hover:text-neutral-600 transition-all duration-300 py-4 px-8 hover:bg-neutral-50 rounded-xl border border-transparent hover:border-neutral-200 tracking-wide"
              >
                Cart
              </button>
              <button
                onClick={() => {
                  if (user) {
                    handleLogout();
                  } else {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }
                }}
                disabled={loading}
                className={`text-2xl font-medium py-5 px-10 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl tracking-wide disabled:opacity-50 disabled:cursor-not-allowed ${
                  user 
                    ? 'bg-red-600 hover:bg-red-700 text-white border border-red-600' 
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-900'
                }`}
              >
                {loading ? 'Loading...' : (user ? 'Logout' : 'Login')}
              </button>
            </div>

            <div className="absolute bottom-10 text-center text-neutral-500 text-sm font-light tracking-wide">
              <p>© 2025 MyStore. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal
        isOpen={cartOpen}
        onClose={handleCartClose}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
