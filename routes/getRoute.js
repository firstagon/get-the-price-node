const path = require("path");
const incomingURLController = require("../controllers/postUrl");
const getHome = require("../controllers/getHome");
const redirectError = require("../controllers/redirect");
const fs = require("fs");

const express = require("express");

exports.getMain = (req, res, next) => {

  getHome(req, res, next);
};

exports.postUrl = (req, res, next) => {
  // console.log(req.body);
  incomingURLController(req, res);
  // res.sendStatus(300);
  // res.redirect(302, "/url");
  // res.end();
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

// exports.resAddingItem = (req, res, next) => {
//   res.sendStatus(201).json({data: "completed adding item"})
// }

exports.sendError = (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../data/dom.html"));
  // res.send(req)
};
