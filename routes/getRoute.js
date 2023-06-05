const express = require("express");
const router = express.Router();
const setUrl = require("../controllers/postUrl");
const getHome = require("../controllers/getHome");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, getHome.getHome);

router.post("/", isAuth, setUrl.incomingURL);

module.exports = router;
