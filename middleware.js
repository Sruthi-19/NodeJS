const http = require("http");
const express = require("express");

const app = express();

app.get(
  "/",
  (req, res, next) => {
    if (req.query.name == "Sruthi") {
      next();
    } else {
      res.send("Nope Wrong");
    }
  },
  (req, res) => {
    res.send("Yes you have come to the data");
  }
);

app.listen(4020);
