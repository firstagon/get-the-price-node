const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "urls.json"
);

const validateURL = (url) => {
  const string = url.toString().trim().split(".");
  // const regString = /[^.]+/.exec(string)[0];
  // console.log('>>>',string,'<<<')
  // console.log(regString)
  // console.log(string);
  // return string.some((el) => el === "ozon");
  return true
};

const checkURL = (url, cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(
        err.errno === -4058 ? "---------> File not exist <----------" : err
      );
      return;
    }
    if (validateURL(url)) {
      console.log("validating");
      const existingURL = JSON.parse(fileContent);
      const checkResult = existingURL.some((el) => el.url === url);
      return cb(checkResult);
      // console.log(checkResult);
    }
    console.log("Domain not supported!");
  });
};

module.exports = checkURL;
