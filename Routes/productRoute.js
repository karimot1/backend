const express = require("express")
const router = express.Router()
const {createproduct,getList,getProductById,deleteProductById,updateProductById} = require('../Controllers/productController')

router.post("/uploadProduct",createproduct)

router.get('/getProducts' , getList )
router.get('/getProducts/:id' , getProductById )
router.post('/deleteProduct/:id' , deleteProductById )
router.post('/updateProduct/:id' , updateProductById )

module.exports= router