import { MongoTopologyClosedError } from "mongodb";
import mongoose, { model } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],

    totalItems: Number,
    totalPrice: Number,

    paymentMethod: String,

    status: {
      type: String,
      default: "Placed",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

