const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserItems = require('../models/getDb/getUserItems');

// const mongoConnect = require("../db/mongo").mongoConnect;

const getFeed = async (req, res, next) => {
  // const token = req.token;
  // const userId = req.userId;

  const data = await getUserItems('645d1c5b8bbca8a986435ead');
  res.json({data});

};

// mongoConnect(() => {
//   getFeed()
// });

exports.getFeed = getFeed;