import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import {
  ShoppingCart,
  Heart,
  User,
  Search,
  X,
} from "lucide-react";

// SearchBar is OUTSIDE Navbar to prevent losing focus while typing
function SearchBar({ value, onSearch, mobile = false }) {
  return (
    <div
      className={`flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-transparent focus-within:border-blue-500 transition ${
        mobile ? "w-full" : "w-72"
      }`}
    >
      {/* Search Icon */}
      <Search size={20} className="text-gray-500 shrink-0" />

      {/* Search Input */}
      <input
        type="search"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="bg-transparent outline-none ml-3 w-full text-sm text-gray-800"
      />

      {/* Clear Search Button */}
      {value && (
        <button
          type="button"
          onClick={() => onSearch("")}
          aria-label="Clear search"
          className="text-gray-500 hover:text-gray-900 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

function Navbar() {
  // Cart and wishlist counters
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Search term from URL
  const query = searchParams.get("search") || "";

  // Search input state
  const [searchInput, setSearchInput] = useState(query);

  // Keep search input synchronized with URL
  useEffect(() => {
    setSearchInput(query);
  }, [query, location.pathname]);

  // Handle live search
  function handleSearch(value) {
    setSearchInput(value);

    const params = new URLSearchParams(
      location.pathname === "/products"
        ? location.search
        : ""
    );

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();

    navigate(
      queryString
        ? `/products?${queryString}`
        : "/products",
      { replace: true }
    );
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* ShopSphere Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/shopsphere-logo.png"
            alt="ShopSphere Logo"
            className="w-23 md:w-40 h-15 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-blue-600 transition"
          >
            Shop
          </Link>

          <Link
            to="/categories"
            className="hover:text-blue-600 transition"
          >
            Categories
          </Link>
        </nav>

        {/* Desktop Search Bar */}
        <div className="hidden lg:block">
          <SearchBar
            value={searchInput}
            onSearch={handleSearch}
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-5">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist with ${wishlistCount} products`}
            className="relative"
          >
            <Heart
              size={23}
              className="hover:text-red-500 transition"
            />

            {wishlistCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative"
          >
            <ShoppingCart
              size={23}
              className="hover:text-blue-600 transition"
            />

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link
            to="/login"
            aria-label="Login"
          >
            <User
              size={23}
              className="hover:text-blue-600 transition"
            />
          </Link>

        </div>
      </div>

      {/* Mobile and Tablet Search Bar */}
      <div className="lg:hidden px-6 pb-4">
        <SearchBar
          value={searchInput}
          onSearch={handleSearch}
          mobile
        />
      </div>

    </header>
  );
}

export default Navbar;