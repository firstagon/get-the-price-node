const getDb = require("../../db/mongo").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const updatePrice = (items) => {
  const db = getDb().db("main").collection("users");
  for (usersId of items.query) {
    const userId = ObjectId(usersId);
    if (isSamePrice) {
      db.updateOne(
        { _id: userId },
        {
          $set: {
            "userData.$[a].lastPrice": data.itemPrice,
            "userData.$[a].updated": new Date().toLocaleString(),
            "userData.$[a].data.itemRating": data.itemRating,
          },
          $pop: { "userData.$[a].data.itemPrice": 1 },
        },
        { arrayFilters: [{ "a.itemCode": data.itemCode }] }
      )
        .then(() => {
          db.updateOne(
            { lastSessionId: sesId },
            {
              $push: {
                "userData.$[a].data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() },
              },
            },
            { arrayFilters: [{ "a.itemCode": data.itemCode }] }
          );
        })
        .then((res) => console.log("writed same price" + " " + data.itemName + data.itemCode))
        .catch((err) => {
          throw err;
        });
    } else {
      db.updateOne(
        { lastSessionId: sesId },
        {
          $set: {
            "userData.$[a].lastPrice": data.itemPrice,
            "userData.$[a].updated": new Date().toLocaleString(),
            "userData.$[a].data.itemRating": data.itemRating,
          },
          $push: { "userData.$[a].data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() } },
        },
        { arrayFilters: [{ "a.itemCode": data.itemCode }] }
      )
        .then((rs) => console.log("writed not same" + " " + data.itemName + data.itemCode))
        .catch((err) => {
          throw err;
        });
    }
  }
};

module.exports = updatePrice;
