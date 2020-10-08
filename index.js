const config = require("config");
const debug = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const auth = require("./auth");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();

app.set("view engine", "pug");
app.set("views", " ./views");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(helmet());

app.use("/api/courses", courses);
app.use("/", home);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan working");
}

app.use(logger);

app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}`));
