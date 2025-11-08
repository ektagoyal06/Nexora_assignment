import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/checkout-success");
  };

  return (
    <div className="px-14 py-12 min-h-screen bg-gradient-to-b from-white to-purple-50">

      <Link to="/cart" className="text-gray-600 hover:underline flex items-center gap-1 mb-6">
        ← Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <input className="w-full p-3 border rounded mb-3" placeholder="Full Name" />
            <input className="w-full p-3 border rounded mb-3" placeholder="Address" />
            <input className="w-full p-3 border rounded mb-3" placeholder="City" />
            <input className="w-full p-3 border rounded mb-3" placeholder="Phone Number" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <select className="w-full p-3 border rounded">
              <option>Cash on Delivery</option>
              <option>UPI / Google Pay</option>
              <option>Credit / Debit Card</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

          {cartItems.map(item => (
            <p className="text-gray-700 mb-2" key={item._id}>
              {item.name} × {item.quantity}
            </p>
          ))}

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}
