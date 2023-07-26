const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const getUserItems = require("../models/getDb/getUserItems");

const getItem = (req, res, next) => {

    console.log(req.params)
  const token = req.token;
  const userId = req.userId;

//   const data = getUserItem(userId, itemCode);

//   res.json({ data });
};

exports.getItem = getItem;
