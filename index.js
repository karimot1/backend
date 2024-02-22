const express = require("express")
const ConnectDb = require("./Config/dbConfig")
const env = require("dotenv").config()
const userRoutes = require("./Routes/UserRoutes")
const cors = require("cors")
const ErrorHandler = require("./Middlewares/ErrorHandler")
const product = require("./Routes/productRoute")
const app = express()

app.use(express.json())
app.use(cors({origin : "*"}))
app.use("/Api/Users", userRoutes)
app.use("/Api/product", product)
app.use(ErrorHandler)



const port = process.env.PORT || 4001

ConnectDb()

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})