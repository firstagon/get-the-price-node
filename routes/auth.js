const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

const getDb = require("../db/mongo").getDb;

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      const db = getDb().db("main").collection("users");
      db.findOne({ user: { email: value } }).then(userDoc =>{
        
      });
    }),
]);
