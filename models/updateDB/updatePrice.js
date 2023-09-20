const getDb = require("../../db/mongo").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const updatePrice = (items) => {
  console.log('reached updating')
  const db = getDb().db("main").collection("users");
  items.forEach((item) => {
    // console.log(item.query)
    for (let usersId of item.query) 
    {
      const userId = new ObjectId(usersId);
      const prevPrice = item.prevData.itemPrice.slice(-1)[0].price;

      if (item.currData.itemPrice === prevPrice || item.currData.available === false) {
        db.updateOne(
          { _id: userId },
          {
            $set: {
              "ozon.$[a].lastPrice": prevPrice,
              "ozon.$[a].updated": new Date().toLocaleDateString(),
            },
            $pop: { "ozon.$[a].data.itemPrice": 1 },
          },
          { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
        )
          .then((res) => {
            db.updateOne(
              { _id: userId },
              {
                $push: {
                  "ozon.$[a].data.itemPrice": {
                    price: prevPrice,
                    updated: new Date().toLocaleString(),
                  },
                },
              },
              { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
            );
          }).catch((err) => {
            throw err;
          });
        
      }

      db.updateOne(
        { _id: userId },
        {
          $set: {
            "ozon.$[a].lastPrice": item.currData.itemPrice,
            "ozon.$[a].updated": new Date().toLocaleDateString(),
          },
        },
        { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
      )
        .then((res) => {
          db.updateOne(
            { _id: userId },
            {
              $push: {
                "ozon.$[a].data.itemPrice": {
                  price: item.currData.itemPrice,
                  updated: new Date().toLocaleString(),
                },
              },
            },
            { arrayFilters: [{ "a.itemCode": item.currData.itemCode }] }
          );
        })
        // .then((res) => console.log("updated users price" + " " + item.currData.itemCode))
        .catch((err) => {
          throw err;
        });
    }
  });
};

module.exports = updatePrice;
