const express = require("express");
const router = express.Router();
const setUrl = require("../controllers/postUrl");
const getHome = require("../controllers/getHome");
const isAuth = require("../middleware/isAuth");
const userFeed = require('../controllers/userFeed');
const userItem = require('../controllers/userItem');
const setFavoriteItem = require('../controllers/setFavItem');
const profile = require('../controllers/profile');

router.get("/", isAuth, getHome.getHome);

router.post("/", isAuth, setUrl.incomingURL);

router.get('/userfeed', isAuth, userFeed.getFeed);
// router.get('/userfeed', isAuth, userFeed.getFeed);
router.get('/item/:itemId', isAuth, userItem.getItem);

router.post('/fav', isAuth, setFavoriteItem.setFav);


router.get('/profile', profile.getProfile);
// router.get('/profile', isAuth, profile.getProfile);
router.post('/profile', isAuth, profile.changePassword);


module.exports = router;
