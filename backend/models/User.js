import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    buildingFlat:{
type: String,
      required: true,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);