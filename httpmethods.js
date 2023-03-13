// const http = require("http");
// const { products } = require("./products");
// var url = require("url");

// let app=http
//   .createServer((req, res) => {
//     var adr = req.url;
//     var q = url.parse(adr, true);
//     switch (req.method) {
//       case "GET":
//         if (q.query.id) {
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.write(
//             JSON.stringify(products.filter((item) => item.id === +q.query.id))
//           );
//           res.end();
//         } else if (q.pathname === "/products") {
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.write(JSON.stringify(products));
//           res.end();
//         }
//         break;
//       case "POST":
//         if (q.query.id && q.query.name && q.query.price) {
//           products.push({
//             id: q.query.id,
//             name: q.query.name,
//             price: q.query.price,
//           });
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.write(JSON.stringify(products));
//           res.end();
//         } else {
//           res.write("Post a valid request");
//           res.end();
//         }
//         break;
//       case "PUT":
//         if (q.query.id) {
//           products.map((item) => {
//             if (item.id == q.query.id) {
//               item.name = q.query.name;
//               item.price = q.query.price;
//             }
//           });

//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.write(JSON.stringify(products));
//           res.end();
//         }
//         break;
//       case "DELETE":
//         if (q.query.id) {
//           let temp = products.findIndex((item) => item.id === +q.query.id);
//           products.splice(temp, 1);
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.write(JSON.stringify(products));
//           res.end();
//         } else {
//           res.write("Give a valid id");
//           res.end();
//         }
//         break;
//       default:
//         res.write("Invalid request method");
//         res.end();
//         break;
//     }
//   })
//   .listen(2000);
