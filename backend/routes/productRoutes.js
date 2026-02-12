import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);     
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

export default router;
