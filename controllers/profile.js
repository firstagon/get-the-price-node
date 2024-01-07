const jwt = require('jsonwebtoken');
const changePassword = require("../models/profile/changePassword");


exports.getProfile = (req, res, next) => {
    const token = req.token;
    const userId = req.userId;

    console.log(process.env.JWT_SECRET)
    res.status(200).json({
        main: "some info about user",
    });

}

exports.changePassword = (req, res, next) => {
    const token = req.token;
    const userId = req.userId;

    //   changePassword();

}