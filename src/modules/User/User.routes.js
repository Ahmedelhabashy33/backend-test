import { Router } from "express";
import {
  Adduser,
  deleteuser,
  getallusers,
  getuser,
  signin,
  signup,
  updateuser,
} from "./User.controller.js";

const userRouter = Router();

userRouter.route("/").post(Adduser).get(getallusers);
userRouter.route("/:id").get(getuser).put(updateuser).delete(deleteuser);
userRouter.route("/auth").post(signup);
userRouter.route("/auth").post(signin);

export default userRouter;
