import { User } from "../models/User.js";
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
// Get user by Mongo _id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
// Get user by userId (profile)
export const getUserByUserId = async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
// Update user by Mongo _id (admin edit page)
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
// Update user by userId (profile)
export const updateUserByUserId = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
