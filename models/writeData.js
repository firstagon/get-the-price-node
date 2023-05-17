const fs = require("fs");
const path = require("path");
const mongoConnect = require("../db/mongo");
const getDb = require("../db/mongo").getDb;

const p = path.join(path.dirname(process.mainModule.filename), "../", "/data/users.json");

const findPrice = (array, currPrice) => {};

const priceHandler = (prev, val) => {
  // console.log(prev, val);
  // console.log("typeof" + typeof(arr))
  if (prev === val) {
    return (samePrevPrice = true);
  } else {
    return (samePrevPrice = false);
  }
};

const findItem = (array, itemCode) => {
  // let prices
  for (val of array) {
    if (val.itemCode === itemCode) {
      console.log(val.itemCode + " " + itemCode);
      val.data.itemPrice;
    }
  }
};

let samePrevPrice = null;
// const client = getDb();

const writeData = async (data, sesId) => {
  const db = getDb().db("main").collection("users");

  db.findOne({ lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } }).then((res) => {
    console.log(res)
    const _itemExist = res ? true : false;
    if (_itemExist) {
      db.updateOne(
        { lastSessionId: sesId },
        {
          $set: {
            "userData.$[a].lastPrice": data.itemPrice,
            "userData.$[a].updated": new Date().toLocaleString(),
            "userData.$[a].data.itemRating": data.itemRating,
          },
        },
        { arrayFilters: [{ "a.itemCode": data.itemCode }] },
        { $push: { "userData.$[a].data.itemPrice": { price: data.itemPrice, data: new Date().toLocaleString() } } },
        { arrayFilters: [{ "a.itemCode": data.itemCode }] }
      ).then().catch(err => {throw err});
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
      ).then().catch(err => {throw err});
    }
  });

  // db.updateOne(
  //   { lastSessionId: sesId },
  //   { $push: { "userData.$[a].data.itemPrice": { price: data.itemPrice, data: new Date().toLocaleString() } } },
  //   { arrayFilters: [{ "a.itemCode": data.itemCode }] }
  // ).then((resp) => console.log(resp));

  // db.findOne({ lastSessionId: sesId }, { userData: { $elemMatch: { itemCode: data.itemCode } } }).then((resp) => {
  //   console.log(resp.userData);
  //   for (val of resp.userData) {
  //     if (val.itemCode === data.itemCode) {
  //       console.log("TRUE")
  //       return
  //     }
  //   }
  // });
};

const writeData_1 = (data, sesId) => {
  // console.log("WRITEDATA.JS -> SES ID " + sesId);
  const db = getDb().db("main").collection("users");
  // console.log(db);

  // db.updateOne(
  //   { "userData.itemCode": data.itemCode },
  //   { $push: { "userData.$.data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() } } }
  // )

  // db.updateOne(
  //   { lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } },
  //   { $addToSet: { userData: {itemCode: data.itemCode, itemName: data.itemName, price: data.itemPrice, data: data} } }
  // );
  // db.findOne({ lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } })

  db.findOne({ lastSessionId: sesId }, { userData: { $elemMatch: { itemCode: data.itemCode } } })
    .then((resp) => {
      console.log(resp.userData);
      const exist = resp ? true : false;
      if (exist) {
        console.log("EXIST");
        // const respPrice = resp.userData[0].data.itemPrice[0].price;
        // console.log(respPrice)
        // priceHandler(respPrice, data.itemPrice);
        if (samePrevPrice) {
          console.log("TRUE MTFK " + samePrevPrice);
          // db.find({ lastSessionId: sesId, userData: { itemCode: { elemMatch: data.itemCode } } })
          //   .then((resp = console.log(resp.userData)))
          //   .catch((err) => console.warn(err));

          db.updateOne(
            { lastSessionId: sesId, userData: { $elemMatch: { itemCode: data.itemCode } } },
            {
              $set: {
                userData: {
                  data: {
                    itemPrice: [{ price: data.price, date: new Date().toLocaleString() }],
                  },
                },
              },
            }
          )
            .then((resp) => console.log("writed TRUE MTHFK"))
            .catch((err) => console.log(err));
        } else {
          console.log("FALSE MTHFK " + samePrevPrice);
          db.updateOne(
            { lastSessionId: sesId, userData: { $elemMatch: { "itemCode.itemCode": data.itemCode } } },
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
            .then((resp) => console.log("writed"))
            .catch((err) => console.log(err));
        }
      } else {
        console.log("NOT EXIST");
        db.updateOne(
          { lastSessionId: sesId },
          {
            $addToSet: {
              userData: {
                itemCode: data.itemCode,
                itemName: data.itemName,
                lastPrice: data.itemPrice,
                updated: new Date().toLocaleString(),
                data: { ...data, itemPrice: [{ price: data.itemPrice, updated: new Date().toLocaleString() }] },
              },
            },
          }
        )
          .then((resp) => console.log("writed"))
          .catch((err) => console.log(err));
      }
    })
    .then((resp) => console.log("WRITEDATA.js -> writed"))
    .catch((err) => console.log("WRITEDATA.js -> err in find " + err));
};

const checkDuplicates = (data) => {};

// writeData()

module.exports = writeData;
