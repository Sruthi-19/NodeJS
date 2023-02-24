const express = require("express");

const app = express();
app.use(express.json());

let products = [
  {
    id: "1",
    title: "Bag",
    price: "$12",
  },
  {
    id: "2",
    title: "Duster",
    price: "$1",
  },
  {
    id: "3",
    title: "Shoes",
    price: "$120",
  },
  {
    id: "4",
    title: "Hat",
    price: "$7",
  },
];

app.get("/products", (req, res) => {
  res.send(JSON.stringify(products));
});

app.get("/products/:id", (req, res) => {
  let result = products.filter((item) => item.id == req.params.id);
  res.send(JSON.stringify(result));
});

app.post("/new_product", (req, res) => {
  products.push(req.body);
  res.send(JSON.stringify(products));
});

app.delete("/delete/:id", (req, res) => {
  products = products.filter((item) => item.id != req.params.id);
  res.send(products);
});

app.patch("/update_product", (req, res) => {
  products = products.map((item) => {
    if (item.id == req.body.exisId) {
      item.id = req.body.updId;
      console.log(item);
      return item;
    }
    return item;
  });
  res.send(products);
});

app.listen(4001, () => {
  console.log("Server Running");
});
