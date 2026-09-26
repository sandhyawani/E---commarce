// controllers/productController.js
import { Product } from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, image, desc } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "All fields required " });
    }

    const product = await Product.create({
      name,
      category: category.toLowerCase().trim(),
      price: Number(price),
      stock: Number(stock || 0),
      image,
      desc,
    });

    res.status(201).json({
      message: "Product added ",
      product,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error " });
  }
};
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {};

    if (category) {
      filter.category = category.toLowerCase().trim();
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i", // case-insensitive
      };
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server error " });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found " });
    }
    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error " });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        category: req.body.category?.toLowerCase().trim(),
        price: Number(req.body.price),
        stock: req.body.stock !== undefined ? Number(req.body.stock) : undefined,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found " });
    }

    res.json({ message: "Product updated ", product: updatedProduct });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error " });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found " });
    }
    res.json({ message: "Product deleted " });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error " });
  }
};
