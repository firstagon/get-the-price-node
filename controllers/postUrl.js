const jwt = require('jsonwebtoken');
const checkURL = require("../models/checkUrls");
// const getDOM = require("../models/getDOM");
const getPage = require("../pptr/QuerySelectors");

exports.incomingURL = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.sessionID);
  const userId = req.userId;

  const newURL = req.body.url;
  checkURL(newURL, function (checkResult) {
    if (checkResult) {
      // console.log(">>>Already exist<<<");
      // return;
      const error = new Error("Url is already in use.");
      error.statusCode = 401;
      throw error;
    }
    // newURL.save();
    // getPage(newURL, session.id);
    getPage(newURL, req.userId)
      .then((resp) => {
        res.json({ data: "completed adding item", date: new Date().toLocaleString() });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    // res.sendStatus(201).json({data: "completed adding item"})
    // console.log('what are u waiting?')
  }).catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
