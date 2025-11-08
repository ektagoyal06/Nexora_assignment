import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-sm bg-white">
      <Link to="/" className="text-2xl font-bold text-purple-600 ml-20">
        🛍️ Mock E-Com Cart
      </Link>

      <div className="flex items-center space-x-6 mr-20">
        <Link to="/" className="font-medium hover:text-purple-600">
          Products
        </Link>
        <Link
          to="/add-product"
          className="font-medium bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Add Product
        </Link>
        {/* Cart Link */}
        <Link
          to="/cart"
          className="flex items-center font-medium text-purple-600 hover:text-purple-800"
        >
          🛒 Cart
        </Link>
      </div>
    </nav>
  );
}
