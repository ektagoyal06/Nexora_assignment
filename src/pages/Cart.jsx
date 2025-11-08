import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import CheckoutModal from "../components/CheckoutModal";

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 10 : 0;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = (subtotal + shipping + tax).toFixed(2);

    return (
        <div className="px-14 py-12 min-h-screen bg-gradient-to-b from-white to-purple-50 ml-10">

            <Link to="/" className="text-gray-600 hover:underline flex items-center gap-1 mb-6">
                ← Continue Shopping
            </Link>

            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{cartItems.length} item(s) in your cart</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">

                <div className="lg:col-span-2 space-y-6">
                    {cartItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center mt-10 w-full mx-auto ml-20">
                            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 6.293a1 1 0 00.968 1.207H18.325M10 21a1 1 0 100-2 1 1 0 000 2zm8 1a1 1 0 100-2 1 1 0 000 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
                            <h2 className="text-1xl font-semibold text-gray-500">Looks like you haven't added anything to your cart yet</h2>
                            <Link to="/" className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">Start Shopping</Link>
                        </div>
                    )}

                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt="" className="w-24 h-24 rounded-lg object-cover" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                    <p className="text-gray-600">₹{item.price} each</p>

                                    <div className="flex items-center gap-2 mt-3">
                                        <button onClick={() => updateQuantity(item._id, "dec")} className="px-3 py-1 bg-gray-200 rounded">-</button>
                                        <span className="font-semibold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, "inc")} className="px-3 py-1 bg-gray-200 rounded">+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <h3 className="text-lg font-semibold">₹{item.price * item.quantity}</h3>
                                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:underline flex items-center gap-1 mt-2">🗑 Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                {cartItems.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

                        <div className="flex justify-between text-gray-700 mb-3">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-700 mb-3">
                            <span>Shipping</span>
                            <span>₹{shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-700 mb-4 border-b pb-4">
                            <span>Tax (8%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-xl font-semibold text-gray-900 mb-6">
                            <span>Total</span>
                            <span className="text-purple-600">₹{total}</span>
                        </div>

                        <button
                            onClick={() => setCheckoutOpen(true)}
                            className="block w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-center"
                        >
                            Proceed to Checkout
                        </button>

                        <p className="text-center text-gray-500 text-sm mt-3">
                            Secure checkout • Free returns
                        </p>
                    </div>
                )}

            </div>

            <CheckoutModal
                isOpen={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                cartItems={cartItems}
                total={total}
                clearCart={clearCart}
            />

        </div>
    );
}
