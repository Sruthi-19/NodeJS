import Jwt from "jsonwebtoken";
import Express from "express";

const app = Express();
app.use(Express.json());

let user = {
  name: "Sruthi",
  password: "Sruthi111@",
};

const verifyToken = (token) => {
  try {
    const result = Jwt.verify(token, "qwerty");
    return result;
  } catch (err) {
    return false;
  }
};

const verifyMiddleware = (req, res, next) => {
  let authtoken = req.headers.authorization;
  authtoken = authtoken.split(" ")[1];
  const isValidToken = verifyToken(authtoken);
  console.log(isValidToken);
  if (!isValidToken) {
    return res
      .status(401)
      .json({ message: "You're not allowed to access this page" });
  }
  res.body = isValidToken;
  next();
};

const getUser = (req, res) => {
  console.log("det", res.body);
  res.send({ data: res.body });
};

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.post("/login", (req, res) => {
  let { username, userpass } = req.body;
  if (username == user.name && userpass == user.password) {
    let signedToken = Jwt.sign(user, "qwerty");
    res.send({ signedToken });
  } else {
    res.status(500).json("Not Valid!!");
  }
});

app.get("/user_details", verifyMiddleware, getUser);

app.listen(3019, () => {
  console.log("App running");
});
