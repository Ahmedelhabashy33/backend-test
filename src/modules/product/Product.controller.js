import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { Product } from "../../../database/models/product.model.js";

const Addproduct = expressAsyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let product = new Product(req.body);
  await product.save();
  res.json({ message: "success", product });
});

const getallproducts = expressAsyncHandler(async (req, res, next) => {
  let pageNumber = req.query.page * 1 || 1;
  if (req.query.page < 1) pageNumber = 1;
  const limit = 2;
  let skip = (parseInt(pageNumber) - 1) * limit;
  let allproducts = await Product.find().skip(skip).limit(limit);
  res.json({ message: "success", pageNumber, allproducts });
});

const getproduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  res.json({ message: "success", product });
});

const updateproduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "success", product });
});

const deleteproduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  product || next(new AppError("category not found", 404));
  !product || res.json({ message: "success", product });
});
export { Addproduct, getallproducts, getproduct, deleteproduct, updateproduct };
