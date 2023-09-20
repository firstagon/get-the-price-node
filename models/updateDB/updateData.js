const getDb = require("../../db/mongo").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

exports.updateData = (isSamePrice, data, userId) => {
  const db = getDb().db("main").collection("users");
  if (isSamePrice) {
    db.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          "ozon.$[a].lastPrice": data.itemPrice,
          "ozon.$[a].updated": new Date().toLocaleString(),
          "ozon.$[a].data.itemRating": data.itemRating,
        },
        $pop: { "ozon.$[a].data.itemPrice": 1 },
      },
      { arrayFilters: [{ "a.itemCode": data.itemCode }] }
    )
      .then(() => {
        db.updateOne(
          { _id: new ObjectId(userId) },
          {
            $push: { "ozon.$[a].data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() } },
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
      { _id: new ObjectId(userId) },
      {
        $set: {
          "ozon.$[a].lastPrice": data.itemPrice,
          "ozon.$[a].updated": new Date().toLocaleString(),
          "ozon.$[a].data.itemRating": data.itemRating,
        },
        $push: { "ozon.$[a].data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() } },
      },
      { arrayFilters: [{ "a.itemCode": data.itemCode }] }
    )
      .then((res) => console.log("writed not same" + " " + data.itemName + data.itemCode))
      .catch((err) => {
        throw err;
      });
  }
};

// db.updateOne(
//   { lastSessionId: sesId },
//   {
//     $set: {
//       "ozon.$[a].lastPrice": data.itemPrice,
//       "ozon.$[a].updated": new Date().toLocaleString(),
//       "ozon.$[a].data.itemRating": data.itemRating,
//     },
//   },
//   { arrayFilters: [{ "a.itemCode": data.itemCode }] },
//   { $push: { "ozon.$[a].data.itemPrice": { price: data.itemPrice, data: new Date().toLocaleString() } } },
//   { arrayFilters: [{ "a.itemCode": data.itemCode }] }
// )
//   .then()
//   .catch((err) => {
//     throw err;
//   });

// db.updateOne(
//   { lastSessionId: sesId },
//   {
//     $addToSet: {
//       ozon: {
//         itemCode: data.itemCode,
//         itemName: data.itemName,
//         lastPrice: data.itemPrice,
//         updated: new Date().toLocaleString(),
//         data: {
//           ...data,
//           itemPrice: [{ ...data.itemPrice, price: data.itemPrice, updated: new Date().toLocaleString() }],
//         },
//       },
//     },
//   }
// )
//   .then()
//   .catch((err) => {
//     throw err;
//   });
