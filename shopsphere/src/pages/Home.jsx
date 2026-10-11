import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    title: "Electronics",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
  },
  {
    title: "Fashion",
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
  },
  {
    title: "Footwear",
    category: "footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    title: "Home & Living",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
  },
  {
    title: "Beauty",
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
  },
  {
    title: "Accessories",
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
];

function Home() {
  return (
    <main>
      <Hero />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold">
            SHOP BY CATEGORY
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Explore Our Categories
          </h2>

          <p className="text-gray-500 mt-4">
            Find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.category}
              {...category}
            />
          ))}
        </div>

      </section>
    </main>
  );
}

export default Home;