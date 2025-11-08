import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-purple-50 px-5">

      <div className="h-28 w-28 bg-purple-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">✅</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
      <p className="text-gray-600 mt-2 max-w-md">
        Thank you for shopping with us. Your order is confirmed and will be delivered soon.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
