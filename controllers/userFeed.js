const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUserItems = require("../models/getDb/getUserIFeed");

// const mongoConnect = require("../db/mongo").mongoConnect;

const getFeed = async (req, res, next) => {
  const token = req.token;
  const userId = req.userId;

  jwt.decode(req.headers.authorization)

  // const data = await getUserItems("645d1c5b8bbca8a986435ead");
  const data = await getUserItems(userId);

  res.json({ data });
  
//   .catch((err) => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   });
};

// mongoConnect(() => {
//   getFeed()
// });

exports.getFeed = getFeed;
