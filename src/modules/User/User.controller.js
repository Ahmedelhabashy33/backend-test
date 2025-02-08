import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
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
      res.json({ message: "login....." });
    } else {
      res.status(401).json({ message: "incorrect password" });
    }
  } else {
    res.status(401).json({ message: "user not found" });
  }
};

const Adduser = expressAsyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let user = new User(req.body);
  await user.save();
  res.json({ message: "success", user });
});

const getallusers = expressAsyncHandler(async (req, res, next) => {
  let pageNumber = req.query.page * 1 || 1;
  if (req.query.page < 1) pageNumber = 1;
  const limit = 2;
  let skip = (parseInt(pageNumber) - 1) * limit;
  let allusers = await User.find().skip(skip).limit(limit);
  res.json({ message: "success", pageNumber, allusers });
});

const getuser = expressAsyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  res.json({ message: "success", user });
});

const updateuser = expressAsyncHandler(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "success", user });
});

const deleteuser = expressAsyncHandler(async (req, res, next) => {
  let user = await User.findByIdAndDelete(req.params.id);
  user || next(new AppError("category not found", 404));
  !user || res.json({ message: "success", user });
});
export {
  Adduser,
  getallusers,
  getuser,
  deleteuser,
  updateuser,
  signin,
  signup,
};
