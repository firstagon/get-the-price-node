const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserItem = require("../models/getDb/getUserItem");
// const getUserItems = require("../models/getDb/getUserItems");

const getItem = async (req, res, next) => {
  const token = req.token;
  const userId = req.userId;
  const itemCode = req.params.itemId;

  console.log(req.params.itemId);

  const data = await getUserItem(userId, itemCode);

  if (!data || data == undefined) {
    console.log('send 404')
    return res.status(404).json({ data: false })
  }

  console.log('send data')
  res.status(200).json({ ...data })

};

exports.getItem = getItem;
