const path = require("path");
const incomingURLController = require("../controllers/main");
const redirectError = require("../controllers/redirect");
const fs = require("fs");

const express = require("express");
// const apiController = require('../controllers/getAPI');
// const router = express.Router();

// router.get('/', apiController.sendPage);

// module.exports = router;

exports.sendPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/test.html"));
};

exports.sendError = ( req, res, next) => {
  // res.sendFile(path.join(__dirname, "../data/dom.html"));
  res.send(req)
}

exports.getURL = (req, res, next) => {
  // console.log(req.body);
  incomingURLController(req.body);
  // res.sendStatus(300);
  res.redirect(302, "/url");
  res.end();
};

exports.redirectError = (req, res, next) => {
  // res.redirect('/error')
  // redirectError(req);
  //   console.log(req)
  //   res.sendStatus(200);
  //   res.send("Hello world");
  // console.log(req.data);
  // res.append("Content-Type", "text/html; charset=UTF-8");

  // res.send(req.data);
  // res.send('somth')
  // console.log(path.join(__dirname, "../data/dom.html"))

  // res.end();
  res.send("REDIRECT ME");
};
