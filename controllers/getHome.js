
const getHome = (req, res, next) => {
    console.log(req.sessionStore)
    res.json({
        main: "welcome homepage?",
      });
}

module.exports = getHome;