import express from "express";
import { dbconn } from "./DataBase/DbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import { AppError } from "./utils/AppError.js";
const app = express();
const port = 3000;
app.use(express.json());
bootstrap(app);
app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  let code = err.statuscode || 500;
  res.status(code).json({ error: "error", message: err.message, code });
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
