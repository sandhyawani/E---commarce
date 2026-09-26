import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByUserId,
  updateUserById,
  updateUserByUserId,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getUserByUserId);
router.put("/profile", protect, updateUserByUserId);

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUserById);
router.delete("/:id", protect, admin, deleteUser);

export default router;
