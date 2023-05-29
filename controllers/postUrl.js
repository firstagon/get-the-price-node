const checkURL = require("../models/checkUrls");
// const getDOM = require("../models/getDOM");
const getPage = require("../pptr/QuerySelectors");

exports.incomingURL = async (req, res, next) => {
  console.log(req.body);
  console.log(req.sessionID);

  const newURL = req.body.data;
  checkURL(newURL, function (checkResult) {
    if (checkResult) {
      console.log(">>>Already exist<<<");
      return;
    }
    // newURL.save();
    // getPage(newURL, session.id);
    getPage(newURL, req.sessionID)
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
  });
};
