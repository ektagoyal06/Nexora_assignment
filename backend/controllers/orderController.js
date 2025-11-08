// backend/controllers/orderController.js
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { name, email, cartItems, total } = req.body;

    if (!name || !email || !cartItems || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = await Order.create({
      name,
      email,
      items: cartItems,
      totalAmount: total
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
