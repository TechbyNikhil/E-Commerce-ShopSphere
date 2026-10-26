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

  const selectedCategory = searchParams.get("category") || "all";

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  function handleCategoryChange(event) {
    const category = event.target.value;

    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
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
            Explore Our Products
          </h1>

          <p className="text-gray-500 mt-3">
            Discover products across all your favorite categories.
          </p>

        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">

          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>

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

        {/* Products Grid */}
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
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}

      </div>

    </main>
  );
}

export default Products;