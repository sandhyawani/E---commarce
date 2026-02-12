import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByUserId,
  updateUserById,
  updateUserByUserId,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:userId", getUserByUserId);
router.put("/profile/:userId", updateUserByUserId);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUser);

export default router;
