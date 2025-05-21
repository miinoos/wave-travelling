const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connectToDB = require("./db/db.js");
const { cookie } = require("express-validator");

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

module.exports = app;
