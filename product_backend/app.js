import express from "express";
import mongoose from "mongoose";
import { productModel } from "./model.js";
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/products_database");

//Get all products
app.get("/products", (req, res) => {
  let pdt = productModel.find().then((pdt) => res.status(200).json(pdt));
});

//Post new product
app.post("/addProduct", (req, res) => {
  const newProduct = new productModel(req.body);
  newProduct.save().then((result) => {
    res.status(200).json(result);
  });
});

//Filter products based on category, rating and price range if given. The page and limit value can also be entered
app.get("/product/filter", (req, res) => {
  let filter = {};
  let minPrice = 0;
  let maxPrice = 10000;
  let limitValue = 4;
  let skipValue = 0;

  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.rating) {
    filter.rating = req.query.rating;
  }
  if (req.query.min) {
    minPrice = req.query.min;
  }
  if (req.query.max) {
    maxPrice = req.query.max;
  }

  if (req.query.limit && req.query.page) {
    limitValue = req.query.limit;
    skipValue = (req.query.page - 1) * limitValue;
  } else if (req.query.page && !req.query.limit) {
    skipValue = (req.query.page - 1) * limitValue;
  } else if (req.query.limit && !req.query.page) {
    limitValue = req.query.limit;
  }

  let pdt = productModel
    .find({
      $and: [
        filter,
        {
          $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
        },
      ],
    })
    .skip(skipValue)
    .limit(limitValue)
    .then((pdt) => res.status(200).json(pdt));
});

//Get page wise products in entered order and limit number of products to be displayed in that page
// app.get("/product/page", (req, res) => {
//   let limitValue = 4;
//   let skipValue = 0;

//   if (req.query.limit && req.query.page) {
//     limitValue = req.query.limit;
//     skipValue = (req.query.page - 1) * limitValue;
//   } else if (req.query.page && !req.query.limit) {
//     skipValue = (req.query.page - 1) * limitValue;
//   } else if (req.query.limit && !req.query.page) {
//     limitValue = req.query.limit;
//   }

//   let pdt = productModel
//     .find({})
//     .skip(skipValue)
//     .limit(limitValue)
//     .then((pdt) => res.status(200).json(pdt));
// });

//Get products between price range
// app.get("/product/price", (req, res) => {
//   let pdt = productModel
//     .find({
//       $and: [
//         { price: { $gte: req.query.min } },
//         { price: { $lte: req.query.max } },
//       ],
//     })
//     .then((pdt) => res.status(200).json(pdt));
// });

app.listen(3019, () => {
  console.log(`App is running on port 3019`);
});
