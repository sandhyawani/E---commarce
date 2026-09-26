import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    desc: { type: String, default: "" },
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);