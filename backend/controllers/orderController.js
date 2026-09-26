import mongoose from "mongoose";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";

// Create new order
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentMethod } = req.body;
    const userId = req.user.userId;

    // Read Cart
    const cart = await Cart.findOne({ userId }).session(session);
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const orderItems = [];
    let totalPrice = 0;

    // Verify stock and prices, and decrement stock
    for (const item of cart.items) {
      // Find product and atomically decrement stock if sufficient
      const product = await Product.findOneAndUpdate(
        { _id: item.productId, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true, session }
      );

      if (!product) {
        throw new Error(`Product ${item.productId} is out of stock or requested quantity unavailable`);
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: item.quantity,
        image: product.image,
      });

      totalPrice += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create([{
      userId,
      items: orderItems,
      totalPrice,
      paymentMethod,
      status: "Placed",
    }], { session });

    // Clear cart
    cart.items = [];
    await cart.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    if (err.message.includes("out of stock") || err.message === "Cart is empty") {
      return res.status(409).json({ message: err.message });
    }
    res.status(500).json({ message: "Order creation failed: " + err.message });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get orders by user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error updating order status" });
  }
};
