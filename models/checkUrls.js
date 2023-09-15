const validateURL = (url) => {
  const string = url.toString().trim().split(".");
  const regString = /[^.]+/.exec(string)[0];
  return string.some((el) => el === "ozon");

};

const checkURL = (url, cb) => {
  if (validateURL(url)) {
    const checkResult = false;
    return cb(checkResult);
  }
  console.log("Domain not supported!");
};

module.exports = checkURL;