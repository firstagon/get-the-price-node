const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const getDb = require("../db/mongo").getDb;
const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value) => {
        const db = getDb().db("main").collection("users");
        const existingUser = await db.findOne({ "user.email": value });
        if (existingUser) {
          throw new Error("A user already exists with this e-mail address");
        }
      })
      .normalizeEmail(),

    body("password").trim().isLength({ min: 3 }),

    // body("name").trim().not().isEmpty(),
  ],

  authController.signup
);

// router.post("/login", authController.login);

router.post("/login", authController.login);

module.exports = router;
