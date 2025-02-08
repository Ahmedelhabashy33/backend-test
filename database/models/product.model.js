import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Product = mongoose.model("Product", schema);
