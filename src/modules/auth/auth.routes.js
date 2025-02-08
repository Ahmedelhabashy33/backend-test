import { Router } from "express";
import { signin, signup } from "./auth.controller.js";

const authRouter = Router();

authRouter.route("/").post(signup);
authRouter.route("/").get(signin);

export default authRouter;
