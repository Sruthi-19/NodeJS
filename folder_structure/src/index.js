import Express, { json } from "express";
import userRouter from "./api/user/user.route.js";

const app = Express();

app.use(json());

app.use("/userRoute", userRouter);

app.listen(5001, () => {
  console.log("App running");
});
