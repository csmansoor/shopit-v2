import express from 'express'
import {
      getProductDetails,
      getProducts,
      newProducts, 
      UpdateProducts, 
      deleteProduct,
    } from "../controllers/productControllers.js";
import { isAuthenticatedUser} from '../middlewares/auth.js';
const router = express.Router();



router.route("/products").get(isAuthenticatedUser,getProducts);
router.route("/products/:id").get(getProductDetails);


router.route("/admin/products").post(isAuthenticatedUser,newProducts);
router.route("/products/:id").put(UpdateProducts);
router.route("/products/:id").delete(deleteProduct);


export default router;