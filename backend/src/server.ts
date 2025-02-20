import express from "express"
import cors from "cors"
import connectDB from "./config/db"
import rootRoute from "./route/route"
require("dotenv").config()

connectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())


app.use("/api/",rootRoute)

app.listen(PORT,()=>console.log("Server is listeing on",PORT))