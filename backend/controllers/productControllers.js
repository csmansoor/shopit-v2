import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorhandler.js";

// Create new Products   =>  /api/v1//products
export const getProducts = async (req, res) =>{

    const products = await Product.find();

    res.status(200).json({
        // if not working type = message: "All Products",
        products,
    });
};

// Create new Products   =>  /api/v1/admin/products
export const newProducts = catchAsyncErrors(async (req, res) =>{
 const product = await Product.create(req.body);

 res.status(200).json({
      product,
 });
 
});

// Get single product details   =>  /api/v1/admin/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.findById(req?.params?.id)

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
   
    res.status(200).json({
         product,
    });
    
   });


   // Update product details   =>  /api/v1/admin/products/:id
export const UpdateProducts = catchAsyncErrors(async (req, res) =>{
    let product = await Product.findById(req?.params?.id)

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });
   
    res.status(200).json({
         product,
    });
    
   });


   // delete product    =>  /api/v1/admin/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req?.params?.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }


    await product.deleteOne();

    res.status(200).json({
        message: "Product Deleted",
    });

});



  