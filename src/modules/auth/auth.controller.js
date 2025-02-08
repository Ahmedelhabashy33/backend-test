import Jwt from "jsonwebtoken";
import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";

const signup = async (req, res, next) => {
  let isfound = await User.findOne({ email: req.body.email });
  if (isfound) {
    return res.status(400).json({ message: "email already exists" });
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  let user = await User.insertOne(req.body);
  res.json({ message: "success", user });
};

const signin = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let match = bcrypt.compareSync(req.body.password, user.password);
    if (match) {
      Jwt.sign(
        { userId: user._id, name: user.name, role: user.role },
        "myname",
        (erro, token) => {
          res.json({ message: "success", token });
        }
      );
    } else {
      res.status(401).json({ message: "incorrect password" });
    }
  } else {
    res.status(401).json({ message: "user not found" });
  }
};

export { signin, signup };
