import { Router } from "express";

import {
  Addproduct,
  deleteproduct,
  getallproducts,
  getproduct,
  updateproduct,
} from "./Product.controller.js";

const productRouter = Router();

productRouter.route("/").post(Addproduct).get(getallproducts);
productRouter
  .route("/:id")
  .get(getproduct)
  .put(updateproduct)
  .delete(deleteproduct);

export default productRouter;
