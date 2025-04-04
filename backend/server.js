import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js"; // Import the Product model

const app = express();

dotenv.config();

app.use(express.json()); // allow us to use json data in req.body

app.post("/api/products",async (req,res)=>{
    const product = req.body; //user will send this data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Please fill all the fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    }catch (error) {
        console.error("error in create product:",error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }

})

app.delete("/api/products/:id",async (req,res)=>{
    const { id } = req.params; // get the id from the url
    try {
        await Product.findByIdAndDelete(id); // delete the product with the given id
        res.status(200).json({success:true, message:"Product deleted successfully"});
    }catch(error) {
        res.status(404).json({success:false, message:"Product not found"});
    }
})


app.listen(5000,()=>{
    connectDB();
    console.log("server run at http://localhost:5000");
})

// ycTL9VbpZkmMY6uW