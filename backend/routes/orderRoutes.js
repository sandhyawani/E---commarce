import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/user/:userId", getUserOrders);
router.put("/:id", updateOrderStatus); 

export default router;
