import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

// Product Categories
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
  // Pagination
const PRODUCTS_PER_PAGE = 12;

const [currentPage, setCurrentPage] = useState(1);

  // Get filter values from URL
  const selectedCategory = searchParams.get("category") || "all";

  const searchQuery =
    searchParams.get("search")?.trim().toLowerCase() || "";

  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const minRating = searchParams.get("rating") || "all";

  const sortBy = searchParams.get("sort") || "default";

  // Update filters without removing existing filters
  const updateFilter = (key, value) => {
    setSearchParams((previousParams) => {
      const updatedParams = new URLSearchParams(previousParams);

      if (
        value === "" ||
        value === "all" ||
        value === "default"
      ) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value);
      }

      return updatedParams;
    });
  };

  // Filter Products
  const filteredProducts = products.filter((product) => {
    // Category
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    // Search
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    // Minimum Price
    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    // Maximum Price
    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    // Rating
    const matchesRating =
      minRating === "all" ||
      product.rating >= Number(minRating);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating
    );
  });

  // Sort Products
  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "price-low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "rating-high":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;

    case "name-az":
      sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    default:
      break;
  }
// Total number of pages
const totalPages = Math.ceil(
  sortedProducts.length / PRODUCTS_PER_PAGE
);

// Calculate starting index
const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

// Get products for current page
const currentProducts = sortedProducts.slice(
  startIndex,
  startIndex + PRODUCTS_PER_PAGE
);

// Change page
function changePage(page) {
  if (page < 1 || page > totalPages) return;

  setCurrentPage(page);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Reset pagination when filters change
useEffect(() => {
  setCurrentPage(1);
}, [searchParams]);
  // Check if any filters are active
  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    minRating !== "all" ||
    sortBy !== "default";

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-blue-600 font-semibold tracking-wide">
            SHOPSPHERE COLLECTION
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Explore Our Products"}
          </h1>

          <p className="text-gray-500 mt-3">
            Discover amazing products across all your favorite categories.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-28">

              {/* Filter Heading */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={20}
                    className="text-blue-600"
                  />

                  <h2 className="text-xl font-bold text-gray-900">
                    Filters
                  </h2>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-7">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-800 mb-3"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) =>
                    updateFilter("category", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-blue-600"
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

              {/* Price Range */}
              <div className="mb-7">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Price Range
                </h3>

                <div className="grid grid-cols-2 gap-3">

                  {/* Minimum Price */}
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-xs text-gray-500 mb-2"
                    >
                      Min Price
                    </label>

                    <input
                      id="minPrice"
                      type="number"
                      min="0"
                      placeholder="₹0"
                      value={minPrice}
                      onChange={(e) =>
                        updateFilter("minPrice", e.target.value)
                      }
                      className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Maximum Price */}
                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-xs text-gray-500 mb-2"
                    >
                      Max Price
                    </label>

                    <input
                      id="maxPrice"
                      type="number"
                      min="0"
                      placeholder="Any"
                      value={maxPrice}
                      onChange={(e) =>
                        updateFilter("maxPrice", e.target.value)
                      }
                      className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>

                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Enter prices in Indian Rupees (₹).
                </p>
              </div>

              {/* Rating Filter */}
              <div className="mb-7">
                <label
                  htmlFor="rating"
                  className="block text-sm font-semibold text-gray-800 mb-3"
                >
                  Customer Rating
                </label>

                <select
                  id="rating"
                  value={minRating}
                  onChange={(e) =>
                    updateFilter("rating", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-blue-600"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5">⭐ 4.5 & Above</option>
                  <option value="4">⭐ 4.0 & Above</option>
                  <option value="3">⭐ 3.0 & Above</option>
                  <option value="2">⭐ 2.0 & Above</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <X size={18} />
                Clear Filters
              </button>

            </div>
          </aside>

          {/* Products Section */}
          <section className="lg:col-span-3">

            {/* Sorting Bar */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-7 flex flex-wrap items-center justify-between gap-4">

              <p className="text-gray-600 text-sm">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {sortedProducts.length}
                </span>{" "}
                {sortedProducts.length === 1
                  ? "product"
                  : "products"}
              </p>

              <div className="flex items-center gap-3">

                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-gray-700"
                >
                  Sort By:
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) =>
                    updateFilter("sort", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white outline-none focus:border-blue-600 text-sm"
                >
                  <option value="default">Featured</option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="rating-high">
                    Highest Rated
                  </option>
                  <option value="name-az">
                    Name: A to Z
                  </option>
                </select>

              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

                <Search
                  size={48}
                  className="text-gray-300 mx-auto mb-5"
                />

                <h2 className="text-2xl font-semibold text-gray-800">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try changing your search or filter settings.
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
            {/* Pagination */}
{totalPages > 1 && (
  <div className="flex flex-wrap items-center justify-center gap-2 mt-12">

    {/* Previous Button */}
    <button
      type="button"
      onClick={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      <ChevronLeft size={18} />
      <span className="hidden sm:inline">Previous</span>
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <button
          key={page}
          type="button"
          onClick={() => changePage(page)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          className={`w-10 h-10 rounded-lg font-semibold transition ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
          }`}
        >
          {page}
        </button>
      )
    )}

    {/* Next Button */}
    <button
      type="button"
      onClick={() => changePage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRight size={18} />
    </button>

  </div>
)}

          </section>
        </div>
      </div>
    </main>
  );
}

// IMPORTANT: Default export required by App.jsx
export default Products;