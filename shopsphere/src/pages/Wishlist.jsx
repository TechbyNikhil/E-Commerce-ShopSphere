import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Wishlist ❤️
          </h1>

          <p className="text-gray-500 mt-2">
            {wishlistCount} saved{" "}
            {wishlistCount === 1 ? "product" : "products"}
          </p>
        </div>

        {wishlist.length === 0 ? (

          // Empty Wishlist
          <div className="bg-white rounded-2xl shadow-sm py-20 px-6 text-center">

            <Heart
              size={64}
              className="text-gray-300 mx-auto mb-6"
            />

            <h2 className="text-2xl font-semibold text-gray-800">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-3 mb-8">
              Save your favorite products here!
            </p>

            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Explore Products
            </Link>
          </div>

        ) : (

          // Wishlist Products
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        )}
      </div>
    </div>
  );
}

export default Wishlist;