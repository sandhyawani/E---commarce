import { Order } from "../models/Order.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, paymentMethod } = req.body;

    const order = await Order.create({
      userId,
      items,
      totalPrice,
      paymentMethod,
      status: "Placed",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
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
      userId: req.params.userId,
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
