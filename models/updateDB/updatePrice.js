const getDb = require("../../db/mongo").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const updatePrice = (items) => {
  const db = getDb().db("main").collection("users");
  items.forEach((item) => {
    for (let usersId of item.query) {
      const userId = new ObjectId(usersId);

      if (item.currData.itemPrice === item.prevData.itemPrice.slice(-1)) {
        db.updateOne( 
          { _id: userId },
          { $set: { "userData.$[a].lastPrice": item.currData.itemPrice, "userData.$[a].updated": new Date(). toLocaleDateString()  } },
          { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
        ).then(res => {
          
        })
      }


      db.updateOne(
        { _id: userId },
        { $set: { "userData.$[a].lastPrice": item.currData.itemPrice, "userData.$[a].updated": new Date(). toLocaleDateString()  } },
        { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
      )
        .then((res) => {
          db.updateOne(
            { _id: userId },
            {
              $push: {
                "userData.$[a].data.itemPrice": {
                  price: item.currData.itemPrice,
                  updated: new Date().toLocaleString(),
                },
              },
            },
            { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
          );
        })
        .then((res) => console.log("updated users price" + " " + item.currData.itemCode))
        .catch((err) => {
          throw err;
        });
    }
  });
};

module.exports = updatePrice;
