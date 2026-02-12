import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const generateUserId = () => {
  return "UID" + Math.floor(1 + Math.random() * 100);
};

export const signup = async (req, res) => {
  try {
    const {
      firstName, 
      lastName,
      address,
      buildingFlat,
      street,
      pincode,
      country,
      state,
      city,
      mobile,
      password,
    } = req.body;

    if (!/^[a-zA-Z0-9]{8,}$/.test(password)) {
      return res.status(400).json({
        message: "Password must be alphanumeric and minimum 8 characters",
      });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        message: "Mobile number must be exactly 10 digits",
      });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);

    let userId = generateUserId();
    while (await User.findOne({ userId })) {
      userId = generateUserId();
    }

    const user = await User.create({
      userId,
      firstName,
      lastName,
      address,
      buildingFlat,
      street,
      pincode,
      country,
      state,
      city,
      mobile,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Signup success ",
      userId: user.userId,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error " });
  }
};
export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user)
      return res.status(401).json({ message: "Invalid userid / password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid userid / password" });

    return res.status(200).json({
      userId: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      mobile: user.mobile,
      city: user.city,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
