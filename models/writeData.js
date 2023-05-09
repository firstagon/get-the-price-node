const fs = require("fs");
const path = require("path");
const mongoConnect = require("../db/mongo");
const getDb = require("../db/mongo").getDb;

const p = path.join(path.dirname(process.mainModule.filename), "../", "/data/users.json");

const writeData = (data, sesId) => {
  console.log("WRITEDATA.JS -> SES ID " + sesId)
  getDb((client) => {
    // console.log(client.db("main").collection("users"));
    const db = client.db("main").collection("users");
    db.updateOne({lastSessionId: sesId, userData: { $elemMatch:  { itemCode: data.itemCode }}}, {$addToSet: {userData: data}});
  });

};

const checkDuplicates = (data) => {};

// writeData()

module.exports = writeData;
