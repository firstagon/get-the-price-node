const fs = require("fs");
const path = require("path");
const mongoConnect = require("../db/mongo");

const p = path.join(path.dirname(process.mainModule.filename), "../", "/data/users.json");

const writeData = (data) => {
  // const currData = req.session;
}

const writeDataOO = (data) => {
  mongoConnect((client) => {
    // console.log(client.db("main").collection("users"));
    const usersdb = client.db("main").collection("users");

    const currData = usersdb.findOne({itemCode: data.itemCode}).then(res => {
      console.log(res);
      // console.log(new Date(Date.parse(res.date)).toLocaleString())
    }).catch(err => console.log(err))

    // usersdb
    //   .insertOne(data)
    //   .then((res) => console.log(res))
    //   .then(() => client.close())
    //   .catch((err) => console.log(err));

  //   usersdb
  //     .updateOne({ itemCode: 199586524 }, { $set: { itemPrice: 3000 } })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  });

  // if (!data) {
  //     return
  // } else {
  //     fs.writeFile(p, JSON.stringify(data), (err) => {
  //         console.log('ERROR:', err);
  //       });
  // }
};

const checkDuplicates = (data) => {};

// writeData()

module.exports = writeData;
