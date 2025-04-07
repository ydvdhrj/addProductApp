import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000; // if the port is not defined in the environment variables, use 5000


app.use(express.json()); // allow us to use json data in req.body

app.use("/api/products", productRoutes); // use the product routes for all the requests that start with /api/products

app.listen(PORT,()=>{
    connectDB();
    console.log("server run at http://localhost:" + PORT);
})

// ycTL9VbpZkmMY6uW