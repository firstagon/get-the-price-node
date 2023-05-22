const fs = require("fs");
const path = require("path");
const mongoConnect = require("../db/mongo");
const getDb = require("../db/mongo").getDb;
const { updateData } = require("./updateDB/updateData");

const p = path.join(path.dirname(process.mainModule.filename), "../", "/data/users.json");

const samePrice = (array, currPrice, itemCode) => {
  // console.log('reached')
  // console.log(array, currPrice);
  let check = false;
  for (val of array) {
    if (val.itemCode === itemCode) {
      if (val.lastPrice === currPrice) {
        return (check = true);
      }
    }
  }
  return check;
};

const writeData = async (data, sesId) => {
  const db = getDb().db("main").collection("users");

  db.findOne({ lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } }).then((res) => {
    // console.log(res.userData)
    const _itemExist = res ? true : false;
    if (_itemExist) {
      const same = samePrice(res.userData, data.itemPrice, data.itemCode);
      updateData(!!same, data, sesId);
    } else {
      db.updateOne(
        { lastSessionId: sesId },
        {
          $addToSet: {
            userData: {
              itemCode: data.itemCode,
              itemName: data.itemName,
              lastPrice: data.itemPrice,
              updated: new Date().toLocaleString(),
              data: {
                ...data,
                itemPrice: [{ ...data.itemPrice, price: data.itemPrice, updated: new Date().toLocaleString() }],
              },
            },
          },
        }
      )
        .then(res => console.log("writed new one"))
        .catch((err) => {
          throw err;
        });
    }
  });
}

module.exports = writeData;
