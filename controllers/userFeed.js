const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getFeed = (req, res, next) => {
  const token = req.token;
  const userId = req.userId;
};
