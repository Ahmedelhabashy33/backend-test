import authRouter from "./modules/auth/auth.routes.js";
import productRouter from "./modules/product/product.routes.js";
import { signup } from "./modules/User/User.controller.js";
import userRouter from "./modules/User/User.routes.js";

export const bootstrap = (app) => {
  app.use("/api/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/api/products", productRouter);
};
