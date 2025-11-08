import React, { useEffect } from "react";

export default function OrderSuccessModal({ isOpen, onClose, name, email, cartItems, total }) {
    if (!isOpen) return null;

    const orderId = "ORD-" + Math.floor(Math.random() * 10000000000);
    const date = new Date().toLocaleString();
    const finalTotal = total;

    // ✅ Send Order Data to Backend when modal is opened
    useEffect(() => {
        async function saveOrder() {
            try {
                await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId,
                        name,
                        email,
                        items: cartItems.map(item => ({
                            productName: item.name,
                            quantity: item.quantity,
                            price: item.price
                        })),
                        totalAmount: finalTotal,
                        date
                    })
                });
            } catch (err) {
                console.log("❌ Error storing order:", err);
            }
        }

        saveOrder();
    }, []);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
            <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg relative">

                <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 text-xl hover:text-black">
                    ✕
                </button>

                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">✔</span>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-center">Order Confirmed!</h2>
                <p className="text-center text-gray-600 mb-6">Thank you for your purchase, {name}</p>

                <div className="border rounded-lg p-4 text-sm text-gray-700">

                    <div className="flex justify-between py-1">
                        <span>Order ID:</span>
                        <span className="font-medium">{orderId}</span>
                    </div>

                    <div className="flex justify-between py-1">
                        <span>Date:</span>
                        <span>{date}</span>
                    </div>

                    <hr className="my-3" />

                    <p className="font-medium mb-2">Items:</p>

                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm py-1">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{Number(item.price) * Number(item.quantity)}</span>
                        </div>
                    ))}

                    <hr className="my-3" />

                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total Paid</span>
                        <span className="text-green-600">₹{finalTotal}</span>
                    </div>
                </div>

                <p className="text-center text-gray-600 mt-4 text-sm">
                    A confirmation email has been sent to <b>{email}</b>
                </p>

                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
