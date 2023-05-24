const express = require("express");
const router = express.Router();
const setUrl = require("../controllers/postUrl");
const getHome = require("../controllers/getHome");

router.get("/", getHome.getHome);

router.post("/", setUrl.incomingURL);

module.exports = router;
