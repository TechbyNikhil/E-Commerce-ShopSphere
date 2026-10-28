import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";

function Placeholder({ title }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        {title} - Coming Soon
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/categories"
          element={<Placeholder title="Categories" />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route
          path="/login"
          element={<Placeholder title="Login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;