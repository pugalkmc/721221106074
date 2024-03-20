import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

mongoose.connect(process.env.MONGODB_URL);


const productSchema = new mongoose.Schema({
    id: Number,
    data: Object
})

const Product = mongoose.model("Product", productSchema);

export default Product;