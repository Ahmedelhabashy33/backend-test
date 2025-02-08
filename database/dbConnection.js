import { connect } from "mongoose";

export const dbconn = connect("mongodb://127.0.0.1:27017/test").then(() =>
  console.log("db connection established")
);
