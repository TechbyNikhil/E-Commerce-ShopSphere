import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
    cartTotal,
  } = useCart();

  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">
          <p className="text-blue-600 font-semibold">
            YOUR SHOPPING BAG
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-3">
            You have {cartCount} items in your cart.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

            <ShoppingBag
              size={70}
              className="mx-auto text-gray-300 mb-6"
            />

            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-6"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <p className="text-sm text-blue-600 capitalize">
                      {item.category}
                    </p>

                    <h3 className="text-lg font-semibold mt-1">
                      {item.name}
                    </h3>

                    <p className="text-xl font-bold mt-3">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="px-4 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={18} />
                        </button>

                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>

                    </div>
                  </div>
                </div>
              ))}

              <Link
                to="/products"
                className="inline-block text-blue-600 font-semibold hover:underline"
              >
                ← Continue Shopping
              </Link>

            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal ({cartCount} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">
                  FREE
                </span>
              </div>

              <hr className="my-5 border-gray-200" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Demo total only. Taxes and shipping rules
                will be calculated during checkout.
              </p>

              <button
                type="button"
                disabled
                className="w-full mt-7 bg-blue-600 text-white py-3 rounded-xl font-semibold opacity-60 cursor-not-allowed"
              >
                Checkout — Coming Soon
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Secure checkout will be added later.
              </p>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;