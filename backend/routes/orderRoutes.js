import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Received Order Data:", req.body); // ✅ Debug
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order Stored Successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing order", error });
  }
});

export default router;
