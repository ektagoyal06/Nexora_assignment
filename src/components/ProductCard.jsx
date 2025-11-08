import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();

  // Check if product is already in cart
  const isAdded = cartItems.some((item) => item._id === product._id);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition flex flex-col">
      <img
        src={product.imageUrl}
        className="h-65 w-full object-cover"
        alt={product.name}
      />

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">
          {product.description}
        </p>

        <p className="text-xl font-bold mt-4 py-2">${product.price}</p>

        <button
          onClick={() => !isAdded && addToCart(product)}
          className={`mt-auto w-full py-2 rounded-lg transition ${
            isAdded
              ? "bg-green-600 cursor-default text-white"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {isAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
