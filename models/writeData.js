const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
    "../", "/data/users.json"
);

const writeData = (data) => {
    if (!data) {
        return
    } else {
        fs.writeFile(p, JSON.stringify(data), (err) => {
            console.log('ERROR:', err);
          });
    }
}

module.exports = writeData;