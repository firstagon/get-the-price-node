const fs = require("fs");
const path = require("path");
const mongoConnect = require("../db/mongo");
const getDb = require("../db/mongo").getDb;

const p = path.join(path.dirname(process.mainModule.filename), "../", "/data/users.json");

const priceHandler = (arr, val) => {
  console.log(arr.length)
  // console.log("typeof" + typeof(arr))
  for(i=0; i<= arr.length; i++) {
    if(arr[i] === val) {
      
    } else {
      return
    }
  }
}

const writeData = (data, sesId) => {
  console.log("WRITEDATA.JS -> SES ID " + sesId);
  getDb((client) => {
    // console.log(client.db("main").collection("users"));
    const db = client.db("main").collection("users");
    // db.updateOne(
    //   { lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } },
    //   { $addToSet: { userData: {itemCode: data.itemCode, itemName: data.itemName, price: data.itemPrice, data: data} } }
    // );
    db.findOne({ lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } })
      .then((resp) => {
        // console.log(resp)
        const exist = resp ? true : false;
        if (exist) {
          // console.log("EXIST")
          const samePrevPrice = false;
          priceHandler(resp.userData[0].data.itemPrice, data.itemPrice)
          db.updateOne(
            { lastSessionId: sesId, userData: { $elemMatch: { "itemCode.itemCode": data.itemCode } } },
            {
              $addToSet: {
                userData: {
                  itemCode: data.itemCode,
                  itemName: data.itemName,
                  lastPrice: data.itemPrice,
                  updated: new Date().toLocaleString(),
                  data: {...data, itemPrice: [resp.price, data.itemPrice]},
                },
              },
            }
          )
            .then((resp) => console.log('writed'))
            .catch((err) => console.log(err));
        } else {
          // console.log("NOT EXIST")
          db.updateOne(
            { lastSessionId: sesId },
            {
              $addToSet: {
                userData: {
                  itemCode: data.itemCode,
                  itemName: data.itemName,
                  lastPrice: data.itemPrice,
                  updated: new Date().toLocaleString(),
                  data: {...data, itemPrice: [data.itemPrice]},
                },
              },
            }
          )
            .then((resp) => console.log('writed'))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log("WRITEDATA.js -> err in find" + err));
  });
};

const checkDuplicates = (data) => {};

// writeData()

module.exports = writeData;
