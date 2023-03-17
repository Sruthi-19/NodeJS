import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("products", productSchema);
