import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.userId, items: [] });
    }
    
    // We need to fetch the product details manually because items is an array of subdocuments
    // Or we could use populate if we defined ref in schema. Since we didn't, let's fetch manually.
    
    let populatedItems = [];
    for (let item of cart.items) {
      let product = await Product.findById(item.productId);
      if (product) {
        populatedItems.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: item.quantity
        });
      }
    }

    res.json({ userId: cart.userId, items: populatedItems });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching cart" });
  }
};

// POST /api/cart/add
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    const newQty = existingItem ? existingItem.quantity + quantity : quantity;

    if (newQty > product.stock) {
      return res.status(409).json({ message: `Only ${product.stock} items available in stock` });
    }

    if (existingItem) {
      existingItem.quantity = newQty;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return getCart(req, res); // Return populated cart
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// PUT /api/cart/:productId
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stock) {
      return res.status(409).json({ message: `Only ${product.stock} items available in stock` });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }
    return getCart(req, res); // Return populated cart
  } catch (err) {
    res.status(500).json({ message: "Error updating cart" });
  }
};

// DELETE /api/cart/:productId
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    return getCart(req, res); // Return populated cart
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ userId: req.user.userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};
