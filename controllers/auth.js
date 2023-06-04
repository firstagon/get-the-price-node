const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newUser = require("../models/user").newUser;
const findUser = require("../models/user").findUser;

const getDb = require("../db/mongo").getDb;

exports.signup = (req, res, next) => {
  // console.log(req.validationResult);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      return newUser(email, name, hashedPw);
    })
    .then((result) => {
      // console.log(result);
      res.status(201).json({ message: "New user created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  // console.log('reached login')
  const email = req.body.email;
  const password = req.body.password;
  findUser(email, password)
    .then((resObj) => {
      if (!resObj.isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: resObj.email,
          userId: resObj.id.toString(),
        },
        "dontshowmeanyone",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: resObj.id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
