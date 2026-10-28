import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
} from "lucide-react";

function ProductCard({ product }) {
  // Shopping cart
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Wishlist
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  // Find product in cart
  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate discount
  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <div className="relative bg-gray-50 h-64 overflow-hidden">
        <Link
  to={`/products/${product.id}`}
  className="block w-full h-full"
>
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
  />
</Link>

        {/* Discount Badge */}
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}% OFF
        </span>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={20}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-500 hover:text-red-500"
            }
          />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5">

        {/* Category */}
        <p className="text-sm text-blue-600 capitalize font-medium">
          {product.category}
        </p>

        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
  <h3 className="text-lg font-semibold text-gray-900 mt-2 hover:text-blue-600 transition">
    {product.name}
  </h3>
</Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-medium">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Add to Cart / Quantity Controls */}
        <div className="mt-5">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-1">

              {/* Decrease Quantity */}
              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition"
                aria-label="Decrease quantity"
              >
                <Minus size={20} />
              </button>

              {/* Quantity */}
              <span className="text-lg font-bold text-blue-700">
                {quantity}
              </span>

              {/* Increase Quantity */}
              <button
                type="button"
                onClick={() => increaseQuantity(product.id)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                aria-label="Increase quantity"
              >
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;