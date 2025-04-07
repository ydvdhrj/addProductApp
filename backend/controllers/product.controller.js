import Product from "../models/Product.js";
import mongoose from "mongoose"; // to check if the id is valid or not

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({}); // find all the products in the database
        res.status(200).json({success:true, data:products});
    }catch (error) {
        console.log("error in get products:",error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
};

export const createProduct = async (req,res)=>{
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

};

export const updateProduct = async (req,res)=>{
    const { id } = req.params; // get the id from the url
    const product = req.body; //user will send this data

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid product id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // update the product with the given id and return the updated product
        return res.status(200).json({success:true, data:updatedProduct});

    } catch(error){
        console.log("error in update product:",error.message);
        res.status(500).json({success:false, message:"Internal server error"});

    }
};

export const deleteProduct = async (req,res)=>{
    const { id } = req.params; // get the id from the url

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid product id"});
    }

    
    try {
        await Product.findByIdAndDelete(id); // delete the product with the given id
        res.status(200).json({success:true, message:"Product deleted successfully"});
    }catch(error) {
        console.log("error in delete product:",error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
};