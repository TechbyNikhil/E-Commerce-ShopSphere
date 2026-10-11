import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-gray-50 min-h-[80vh] flex items-center">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="max-w-2xl">

          <p className="text-blue-600 font-semibold mb-4">
            WELCOME TO SHOPSPHERE
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Discover Everything
            <span className="text-blue-600"> You Love.</span>
          </h1>

          <p className="text-gray-600 text-lg mt-6">
            Explore the latest electronics, fashion, footwear,
            home essentials, beauty products, and accessories
            — all in one place.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Shop Now →
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Home;