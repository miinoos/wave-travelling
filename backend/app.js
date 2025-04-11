const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("./db/db.js");

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

module.exports = app;
