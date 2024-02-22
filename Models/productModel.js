
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    ProductName:{
        type:String, required:true, trim:true
    },

    ProductDescription:{
        type:String, required:true,

    },
    ProductPrice:{
        type:String, required:true, 

    },
    ProductImage:{
        type:String, required:true, 

    },
    ProductCategory:{
        type:String,
         required:true, 
        enum:["electronic","foodstuffs","fashion","fragrance"]
    }
}, {timestamps:true})

const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel
