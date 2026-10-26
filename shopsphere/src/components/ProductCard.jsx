import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <div className="relative bg-gray-50 h-64 overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Discount Badge */}
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}% OFF
        </span>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:text-red-500"
        >
          <Heart size={20} />
        </button>

      </div>

      {/* Product Information */}
      <div className="p-5">

        <p className="text-sm text-blue-600 capitalize font-medium">
          {product.category}
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

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

        {/* Add to Cart */}
        <button
  type="button"
  onClick={() => addToCart(product)}
  className="w-full mt-5 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
>
  <ShoppingCart size={19} />
  Add to Cart
</button>

      </div>

    </div>
  );
}

export default ProductCard;