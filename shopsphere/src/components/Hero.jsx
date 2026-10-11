import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ✨ Discover Our Latest Collection
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover More.
            <br />
            Shop Smarter.
            <br />
            <span className="text-blue-600">
              Live Better.
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 max-w-lg">
            Explore amazing deals on electronics, fashion,
            footwear, home essentials, and more.
            Everything you love, all in one place.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/products"
              className="flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/categories"
              className="border border-gray-300 px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Explore Categories
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="text-blue-600" size={22} />
              Fast Delivery
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={22} />
              Secure Shopping
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw className="text-blue-600" size={22} />
              Easy Returns
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
            alt="ShopSphere shopping collection"
            className="relative w-full h-[420px] object-cover rounded-3xl shadow-2xl"
          />

          <div className="absolute bottom-6 left-6 bg-white p-5 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-500">
              Special Offers
            </p>
            <h3 className="text-2xl font-bold text-blue-600">
              Up to 50% OFF
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;