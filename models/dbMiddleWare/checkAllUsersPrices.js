const getDb = require("../../db/mongo").getDb;
const mongoConnect = require("../../db/mongo").mongoConnect;

const { all } = require("axios");
const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "../../", "/data/arrayOfItems.json");

let _items = [];

const sort = (arr) => {
    const id = arr._id.toString();
    arr.userData.forEach(el => {
        
    });
}

const checkUsersPrices = async () => {
  const db = getDb().db("main").collection("users");
  const unCheckedItems = [];
  const allUsers = await db.find().toArray();
  console.log("working");
  console.log(allUsers);
  fs.writeFile(p, JSON.stringify(allUsers), err => console.log(err));
};

mongoConnect(() => {
  console.log("connected!");
  checkUsersPrices();
});

// const connection = async () => {
//     const conn = await mongoConnect();
//     checkUsersPrices().catch(err => console.log(err))
// }

// connection()

module.exports = checkUsersPrices;
