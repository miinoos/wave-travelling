const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/UserController");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be atleasr 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should have atleast 6 characters"),
  userController.registerUser,
]);

module.exports = router;
