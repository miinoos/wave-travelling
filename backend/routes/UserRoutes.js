const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleasr 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have atleast 6 characters"),
  ],
  (req, res) => {
    // Example response for successful registration
    res.status(201).json({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: {
        _id: "643d1f9e8f1b2c001c8e4d3a",
        fullname: {
          firstname: "John",
          lastname: "Doe",
        },
        email: "john.doe@example.com",
      },
    });
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have atleast 6 characters"),
  ],
  (req, res) => {
    // Example response for successful login
    res.status(200).json({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: {
        _id: "643d1f9e8f1b2c001c8e4d3a",
        fullname: {
          firstname: "John",
          lastname: "Doe",
        },
        email: "john.doe@example.com",
      },
    });
  }
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

module.exports = router;
