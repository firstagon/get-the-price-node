const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "urls.json"
);

const getURLfromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class URL {
  constructor(url) {
    this.url = url;
  }

  save() {
    getURLfromFile((url) => {
      url.push(this);
      fs.writeFile(p, JSON.stringify(url), (err) => {
        console.log('ERROR:', err);
      });
    });
  }

  static fetchALL(cb) {
    getURLfromFile(cb);
  }
};
