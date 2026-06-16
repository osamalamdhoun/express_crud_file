const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");
const pathe = require("path");

require("dotenv").config();

const app = express();
const pathStaicFile = pathe.join(__dirname, "./public");

// static file ....
app.use(express.static(pathStaicFile));
// 1) Meddlware
app.use(express.json());
if (process.env.MOD_ENV === "development") {
  app.use(morgan("dev"));
}


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
