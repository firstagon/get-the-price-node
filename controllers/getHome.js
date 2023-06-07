const jwt = require('jsonwebtoken');

exports.getHome = (req, res, next) => {
    // console.log(req.sessionStore)
    res.status(200).json({
        main: "welcome homepage?",
      });
}
