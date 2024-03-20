import express from 'express'
import { config } from 'dotenv'
import axios from 'axios'
import Product from '../Models/Products.js'
config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
var TOKEN = null
const companyDetails = {
    "companyName": "ProMart",
    "clientID": "405d0618-12b4-4ca8-b707-e44340b33596",
    "clientSecret": "sBDKvTrveDMtqRZk",
    "ownerName": "Pugazhenthi S",
    "ownerEmail": "pugalkmc@gmail.com",
    "rollNo": "721221106074"
}

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"]
const products = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"]
const router = express.Router()

const checkToken = async (req, res, next) => {
    try {
        const response = await axios.post('http://20.244.56.144/products/auth', companyDetails);
        if (response.data.access_token) {
            TOKEN = response.data.access_token;
            return next();
        } else {
            console.log("No token found");
            return res.status(500).json({ message: 'Token not found' });
        }
    } catch (error) {
        console.log("Error fetching token:", error);
        return res.status(500).json({ message: 'Error fetching token' });
    }
};

router.get('/:categoryname/products', checkToken, async (req, res) => {

    const { n, page } = req.query;
    const categoryName = req.params.categoryname;

    if (n <= 0) {
        return res.status(400).json({ message: 'Number of queries should be greater than 1' });
    } else if (n > 10 && !page) {
        return res.status(400).json({ message: "Number of queries exceeds, additional 'page' query is needed" });
    }

    if (products.includes(categoryName)) {
        try {
            const requests = companies.map(each =>
                axios.get(`http://20.244.56.144/products/companies/${each}/categories/${categoryName}/products?top=${100}&minPrice=${1}&maxPrice=${100000}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                })
            );

            const responses = await Promise.all(requests);

            var totalProducts = responses.reduce((acc, response) => {
                acc.push(...response.data);
                return acc;
            }, []);

            var removeOutOfStock = []
            totalProducts.map(async (each)=>{
                if (each.availability === 'yes'){

                    // const product = await Product.create(each);
                    // each.set(product._id)
                    removeOutOfStock.push(each)
                }
            })

            removeOutOfStock.sort((product1, product2)=>{
                return product1.rating-product2.rating
            })

            console.log(removeOutOfStock)
            removeOutOfStock.reverse();

            return res.json(removeOutOfStock);
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(400).json({ message: "Product category not found" });
    }
});



// http://20.244.56.144/products/companies/AMZ/categories/Phone/products?top=1&minPrice=1&maxPrice=1000000



router.get("/:categoryName/products/:productId", checkToken, async (req,res)=> {
    const { productId } = req.params;

    const getData = await Product.findOne({productId: parseInt(productId)});
    return res.json(getData);
})

export default router;