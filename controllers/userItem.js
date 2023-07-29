const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserItem = require("../models/getDb/getUserItem");
// const getUserItems = require("../models/getDb/getUserItems");

const getItem = async (req, res, next) => {
  const token = req.token;
  const userId = req.userId;
  const itemCode = req.params.itemId;

  // console.log(req.params.itemId);

  const data = await getUserItem(userId, itemCode);
  // console.log('____________________')
  // console.log(data)
  res.json({ ...data })
  // .catch((err) => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });

  //   res.json({ data });
};

exports.getItem = getItem;
