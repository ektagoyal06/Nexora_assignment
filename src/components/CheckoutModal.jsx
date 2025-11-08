import { useState } from "react";
import OrderSuccessModal from "./OrderSuccessModal";

export default function CheckoutModal({ isOpen, onClose, cartItems, total, clearCart }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const [finalTotal, setFinalTotal] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fullName.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
  }

  try {
      const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              name: fullName,
              email,
              cartItems,
              total
          })
      });

      const data = await response.json();
      console.log("Order Saved:", data);
  } catch (error) {
      console.log("Error saving order:", error);
  }

  setFinalTotal(total);
  setShowSuccess(true);
};


    return (
        <>
            {!showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-xl p-8 rounded-xl shadow-lg relative">

                        <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 text-xl hover:text-black">
                            ✕
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Checkout</h2>
                        <p className="text-gray-600 mb-6">Complete your order by filling in your details below.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-right text-lg font-semibold text-purple-600">Total: ₹{total}</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={onClose} className="w-1/2 py-2 border rounded-lg">Cancel</button>
                                <button type="submit" className="w-1/2 py-2 bg-purple-600 text-white rounded-lg">Place Order</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {showSuccess && (
                <OrderSuccessModal
                    isOpen={showSuccess}
                    onClose={() => {
                        clearCart(); 
                        onClose();
                    }}
                    name={fullName}
                    email={email}
                    cartItems={cartItems}
                    total={finalTotal}
                />
            )}
        </>
    );
}
