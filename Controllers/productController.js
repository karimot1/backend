const ProductModel = require("../Models/productModel")
const {cloudinary} = require("../Config/cloudineryConfig")
//create a new product

const createproduct = async (req, res) => {
    const { ProductName, ProductDescription, ProductPrice, ProductImage, ProductCategory } = req.body;
    if (!ProductName || !ProductDescription || !ProductPrice || !ProductImage || !ProductCategory) {
        res.status(400).send({message: "All fields are required"});
    } else {
        try {
            const imageUpload = await cloudinary.uploader.upload(ProductImage, { folder: "productImages" }); 
            const productlink = imageUpload.secure_url;
            console.log("productLink", productlink);
            
            const createproduct = await ProductModel.create({
                ProductName,  
                ProductDescription,
                ProductPrice,
                ProductImage: productlink,
                ProductCategory
            });
            
            if (!createproduct) {
                res.status(400).send({message: 'Unable to post product', status: false});
            } else {
                res.status(200).send({message: 'Product posted', status: true});
            }

        } catch (error) {
            console.log("error", error);
            res.status(500).send({message: "Server error"});
        }
    }
};
const getList = async (req, res)=> {
    try {
        const productList = await ProductModel.find()
        if (!productList) {
            res.status(400).send({message:"unable to fetch products" , status:"false"})
        }else {
            res.status(200).send({message:"products fetched successfully" , status:"okay" , data:productList})
            console.log('product list', productList);
        }
        
    } catch (error) {
        res.status(400).send({message:"internal server error"})
        console.log('server error', error);
    }

}

const getProductById = async (req, res) => {
  const id = req.params.id 
  if(!id){
    res.status(400).send({message:'id is not provided'})
  }else{
    try {
        const product = await ProductModel.findById(id)
        if (!product) {
            res.status(400).send({message:"product not found" , status:'false'} )
            
        }else {
            console.log('product found:', product);
            res.status(200).send({message:"product successfully fetched", status:"okay", product})
        }
    } catch (error) {
        res.status(400).send({message:"internal server error" } )
        console.log('server error', error);
    }
  }
};


const deleteProductById = async(req,res)=> {
const id = req.params.id
if(!id){
    res.status(400).send({message:'id is not provided'}) 
}else{
    try {
        const productToDelete = await ProductModel.findByIdAndDelete(id)
        if (!productToDelete) {
            res.status(400).send({message:"Unable to delete product" , status:'false'} )
        }else {
            res.status(200).send({message:"product successfully deleted", status:"okay"})
            console.log('deleted product:', productToDelete);
        }
        
    } catch (error) {
        res.status(400).send({message:"internal server error" } )
        console.log('server error', error); 
    }
}


}

const updateProductById = async(req,res)=> {
    const id = req.params.id 
    console.log("id",id);
    if(!id){
        res.status(400).send({message:'id is not provided'}) 
    }else{
        const { ProductImage , ProductCategory , ProductDescription , ProductName , ProductPrice} = req.body
        if (!ProductName || !ProductDescription || !ProductPrice || !ProductImage || !ProductCategory ){
            res.status(400).send({message:'all fields are required'})
        }else{
            try {
                const imageUpload = await cloudinary.uploader.upload(ProductImage,{folder:'productImages'})
                const productLink = imageUpload.secure_url
                const productToUpdate = await ProductModel.findByIdAndUpdate( id , {
                    ProductName,
                    ProductDescription,
                    ProductPrice,
                    ProductImage : productLink,
                    ProductCategory
                }, {new: true})
            
                if (!productToUpdate) {
                    res.status(400).send({message:"Unable to edit product" , status:'false'} )
                }else {
                    res.status(200).send({message:"product successfully updated", status:"okay"})
                    console.log('updated product:', productToUpdate);
                }
            
            } catch (error) {
                res.status(400).send({message:"internal server error" } )
        console.log('server error', error);
            }
        }
        



    }

}



module.exports = {createproduct , getList , getProductById , deleteProductById , updateProductById }