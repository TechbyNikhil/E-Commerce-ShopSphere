import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();

  // Find product using URL ID
  const product = products.find(
    (item) => String(item.id) === id
  );

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  // Product not found
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold text-gray-900">
          Product Not Found
        </h1>

        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Get product quantity
  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const isWishlisted = isInWishlist(product.id);

  // Discount percentage
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  // Related products
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <span>/</span>

          <Link to="/products" className="hover:text-blue-600">
            Shop
          </Link>

          <span>/</span>

          <span className="text-gray-900 font-medium">
            {product.name}
          </span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-6 md:p-10 shadow-sm">

          {/* Product Image */}
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[350px] md:h-[500px] object-contain"
            />

            {discount > 0 && (
              <span className="absolute top-5 left-5 bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col">

            <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
              {product.category}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-5">
              <Star
                size={20}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold">
                {product.rating}
              </span>

              <span className="text-gray-400 text-sm">
                Customer Rating
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4 mt-7">

              <span className="text-4xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="text-xl text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>

              {discount > 0 && (
                <span className="text-green-600 font-semibold">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Product Description
              </h2>

              <p className="text-gray-600 leading-relaxed mt-3">
                {product.description ||
                  `Discover the ${product.name}, designed for
                  quality, comfort, and everyday use.
                  Shop confidently with ShopSphere.`}
              </p>
            </div>

            {/* Features */}
            <div className="mt-7 space-y-3">
              {[
                "Quality product",
                "Secure shopping experience",
                "Easy cart and wishlist management",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <CheckCircle
                    size={19}
                    className="text-green-500"
                  />

                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Add to Cart / Quantity Controls */}
            <div className="mt-9">
              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  <ShoppingCart size={21} />
                  Add to Cart
                </button>
              ) : (
                <div className="w-full flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-2">

                  <button
                    type="button"
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-white text-blue-600 p-3 rounded-lg hover:bg-blue-100 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={22} />
                  </button>

                  <span className="text-xl font-bold text-blue-700">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={22} />
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`mt-4 flex items-center justify-center gap-3 border-2 py-4 rounded-xl font-semibold transition ${
                isWishlisted
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-500"
              }`}
            >
              <Heart
                size={21}
                className={isWishlisted ? "fill-red-500" : ""}
              />

              {isWishlisted
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>

            {/* Back Button */}
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 mt-6"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Related Products
              </h2>

              <p className="text-gray-500 mt-2">
                You might also like these products.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>

          </section>
        )}

      </div>
    </main>
  );
}

export default ProductDetails;