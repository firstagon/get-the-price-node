const checkURL = require("../models/checkUrls");
const getDOM = require("../models/getDOM");

const fs = require("fs");

const URL = require("../models/urls");

// JSDom
// Cronjob creates Jobs on a repeating schedule
// axios http request

// exports.sendPage = (res, req, next) =>  {
//     //
//     // console.log(path.join(__dirname, '../views/test.html'));
//     res.render('test');

//     res.send('hello there');
//     res.end();

// }

module.exports = incomingURLController = async (obj) => {
  const newURL = new URL(obj.data);
  checkURL(newURL.url, function (checkResult) {
    if (checkResult) {
      console.log(">>>Already exist<<<");
      getDOM(newURL.url);
      return;
    }
    newURL.save();
    getDOM(newURL.url);
  });
};
