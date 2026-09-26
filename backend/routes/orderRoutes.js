import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getAllOrders);
router.get("/my", protect, getUserOrders);
router.put("/:id", protect, admin, updateOrderStatus); 

export default router;
