const express = require("express");
const router = express.Router();
const setUrl = require("../controllers/postUrl");
const getHome = require("../controllers/getHome");
const isAuth = require("../middleware/isAuth");
const userFeed = require('../controllers/userFeed');
const userItem = require('../controllers/userItem');

router.get("/", isAuth, getHome.getHome);

router.post("/", isAuth, setUrl.incomingURL);

router.post('/userfeed', isAuth, userFeed.getFeed);
// router.get('/userfeed', isAuth, userFeed.getFeed);
router.post('/item/:itemId', isAuth, userItem.getItem);

module.exports = router;
