import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Heart, User, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

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
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-blue-600">
            Shop
          </Link>

          <Link to="/categories" className="hover:text-blue-600">
            Categories
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-72">
          <Search size={20} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">

          <Link to="/wishlist" aria-label="Wishlist">
            <Heart
              size={23}
              className="hover:text-blue-600 cursor-pointer"
            />
          </Link>

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

          <Link to="/login" aria-label="Login">
            <User
              size={23}
              className="hover:text-blue-600 cursor-pointer"
            />
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;