import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

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

        <Route
          path="/products"
          element={<Placeholder title="Products" />}
        />

        <Route
          path="/categories"
          element={<Placeholder title="Categories" />}
        />

        <Route
          path="/cart"
          element={<Placeholder title="Cart" />}
        />

        <Route
          path="/wishlist"
          element={<Placeholder title="Wishlist" />}
        />

        <Route
          path="/login"
          element={<Placeholder title="Login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;