import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopSphere<span className="text-gray-900">.</span>
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

          <Link to="/cart" aria-label="Shopping cart">
            <ShoppingCart
              size={23}
              className="hover:text-blue-600 cursor-pointer"
            />
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