import express from "express"
import cors from 'cors'
import router from "./router/category.js"
import { config } from "dotenv"
import morgan from 'morgan'
config()

const app = express()
app.use(morgan())
app.use(express.json())

//give access to any domains (public)
app.use(cors())

app.use("/category", router);

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server listening to port ${PORT}`)
})