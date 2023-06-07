const getDb = require("../../db/mongo").getDb;

exports.deleteItem = (itemCode, userId) => {
  const db = getDb().db("main").collection("users");

  db.deleteOne(
    { _id: userId },
    { "userData.$[a].data.itemPrice": { price: data.itemPrice, updated: new Date().toLocaleString() } },
    { arrayFilters: [{ "a.itemCode": data.itemCode }] }
  );
};
