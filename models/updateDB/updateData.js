const getDb = require("../../db/mongo").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

exports.updateData = (isSamePrice, data, sesId) => {
    const db = getDb().db("main").collection("users");
  if (isSamePrice) {
    db.updateOne(
      { _id: new ObjectId(sesId) },
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
          { _id: new ObjectId(sesId) },
          {
            $push: { "userData.$[a].data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() } },
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
      { _id: new ObjectId(sesId) },
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
};

// db.updateOne(
//   { lastSessionId: sesId },
//   {
//     $set: {
//       "userData.$[a].lastPrice": data.itemPrice,
//       "userData.$[a].updated": new Date().toLocaleString(),
//       "userData.$[a].data.itemRating": data.itemRating,
//     },
//   },
//   { arrayFilters: [{ "a.itemCode": data.itemCode }] },
//   { $push: { "userData.$[a].data.itemPrice": { price: data.itemPrice, data: new Date().toLocaleString() } } },
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
//       userData: {
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
