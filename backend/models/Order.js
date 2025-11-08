import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  productName: String,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
