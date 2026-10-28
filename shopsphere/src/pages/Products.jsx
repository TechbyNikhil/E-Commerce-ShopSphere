import { useSearchParams } from "react-router-dom";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = [
  "all",
  "electronics",
  "fashion",
  "footwear",
  "home",
  "beauty",
  "accessories",
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get category from URL
  const selectedCategory =
    searchParams.get("category") || "all";

  // Get search term from URL
  const searchQuery =
    searchParams.get("search")?.trim().toLowerCase() || "";

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  // Change category without losing search
  function handleCategoryChange(event) {
    const category = event.target.value;

    setSearchParams((previousParams) => {
      const updatedParams = new URLSearchParams(previousParams);

      if (category === "all") {
        updatedParams.delete("category");
      } else {
        updatedParams.set("category", category);
      }

      return updatedParams;
    });
  }

  // Clear all filters
  function clearFilters() {
    setSearchParams({});
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Page Heading */}
        <div className="mb-10">

          <p className="text-blue-600 font-semibold">
            SHOPSPHERE COLLECTION
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-3">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Explore Our Products"}
          </h1>

          <p className="text-gray-500 mt-3">
            Discover products across all your favorite categories.
          </p>

        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">

          <div>
            <p className="text-gray-600">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>

            {(searchQuery || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-blue-600 text-sm font-medium mt-2 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none focus:border-blue-600"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all"
                  ? "All Categories"
                  : category.charAt(0).toUpperCase() +
                    category.slice(1)}
              </option>
            ))}
          </select>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        ) : (

          /* No Results */
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">

            <h2 className="text-2xl font-semibold text-gray-800">
              No products found 🔍
            </h2>

            <p className="text-gray-500 mt-3">
              Try searching for another product or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              View All Products
            </button>

          </div>
        )}

      </div>

    </main>
  );
}

export default Products;