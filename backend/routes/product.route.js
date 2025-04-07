import express from "express";
import { createProduct, updateProduct, getProducts,deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();


router.get("/", getProducts); // get all the products from the database

router.post("/", createProduct);
// we use patch when we want to update only some fields of the product and put when we want to update all the fields of the product
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct); // delete the product with the given id


export default router;