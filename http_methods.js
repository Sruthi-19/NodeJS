const http = require("http");
const url = require("url");
const { parse } = require("querystring");
const products = require("./products.json");

let app = http.createServer((request, response) => {
  const path = url.parse(request.url, true);
  //   console.log("REQUEST", request);

  response.writeHead(200, { "Content-Type": "text/html" });
  //   response.write("Welcome to main page");
  switch (request.method) {
    case "GET":
      if (path.pathname == "/products") {
        response.write(JSON.stringify(products));
      } else if (path.pathname == "/products/" && path.query.id) {
        let result = products.filter((item) => item.id == path.query.id);
        response.write(JSON.stringify(result));
      }

      break;
    case "POST":
      if (path.pathname == "/add_product") {
        let newProduct = "";
        request.on("data", (chunk) => {
          newProduct += chunk.toString();
        });
        request.on("end", () => {
          newProduct = JSON.parse(newProduct);
          products.push(newProduct);
          console.log("shut:", products);
          //   response.end(JSON.stringify(products));
        });
        console.log("NEW", newProduct);
      } else {
        response.write("Nope path name for post is not right");
      }

      break;
  }
  response.end();
});

app.listen(4019);
