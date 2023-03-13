import { Router } from "express";
import { getUser, loginUser } from "./user.controller.js";
import { isAuthorised } from "./user.middleware.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.get("/", isAuthorised, getUser);

export default userRouter;





import { signToken, verifyToken } from "../../services/jwt/jwt.provider.js";

const USER_NAME = "xdankit";
const PASSWORD = "qwerty";

export const loginUser = (req, res) => {
  const { userName, password } = req.body;

  if (userName !== USER_NAME || password !== PASSWORD) {
    return res
      .status(401)
      .json({ message: "Please enter a valid credentials" });
  }

  const token = signToken({ userName });
  res.send({ token });
};

export const getUser = (req, res) => {
  res.send({ data: isValidToken });
};


export const isAuthorised = (req, res, next) => {
  const { authorization } = req.headers;

  const isValidToken = verifyToken(authorization);
  if (!isValidToken) {
    return res
      .status(401)
      .json({ message: "You're not allowed to access this page" });
  }

  next();
};








import jwt from "jsonwebtoken";
import { JWT_PASS_KEY } from "./jwt.config.js";

export const signToken = (payload) => {
  if (!payload) {
    return false;
  }

  const result = jwt.sign(payload, JWT_PASS_KEY);
  return result;
};

export const verifyToken = (token) => {
  try {
    const result = jwt.verify(token, JWT_PASS_KEY);
    return result;
  } catch (err) {
    return false;
  }
};

export const decodeToken = (token) => {
  try {
    const result = jwt.decode(token);
    return result;
  } catch (err) {
    return false;
  }
};
