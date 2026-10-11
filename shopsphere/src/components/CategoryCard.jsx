import { Link } from "react-router-dom";

function CategoryCard({ title, image, category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category)}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Explore Collection →
        </p>
      </div>
    </Link>
  );
}

export default CategoryCard;