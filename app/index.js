const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const trimRequest = require("trim-request");
const logger = require("morgan");
const debug = require("debug")("app:express");
const passport = require("passport");
const { ServerError } = require("../utils/core");
const { authRouter } = require("./router/auth");
const { lMHRouter } = require("./router/localMinistryOfHealth");
const { doctorRouter } = require("./router/doctor");
const { prohibitedDrugRouter } = require("./router/prohibitedDrug");
const { prescriptionRouter } = require("./router/prescription");
const app = express();
app.use(
  helmet({
    crossdomain: false,
    referrerPolicy: true,
  })
);
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(trimRequest.all);
app.use(logger("dev"));

const db = require("../models");
db.sequelize.sync({ alert: true });

// eslint-disable-next-line no-unused-vars
app.get("/", (req, res, next) => {
  res.json({ message: "server is Up and Running!" });
});

app.use("/auth", authRouter);
app.use("/lmh", lMHRouter);
app.use("/doctor", doctorRouter);
app.use("/drug", prohibitedDrugRouter);
app.use("/prescription", prescriptionRouter);
// 404 handler
app.use("*", (req, res, next) => {
  next(new ServerError("API_NOT_FOUND", 404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).json({
      message: 'please use the property "file" to upload your documents',
    });
  }
  if (!err.status) {
    console.log(err)
    debug(err);
    return res.status(500).json({ message: "server error" });
  }
  debug("Custom Server Error >", err.message);
  return res
    .status(err.status)
    .json({ message: err.message, status: err.status });
});

module.exports = { app };
