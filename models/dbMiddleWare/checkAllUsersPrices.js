const getDb = require("../../db/mongo").getDb;
const mongoConnect = require("../../db/mongo").mongoConnect;
const updateAllUsersPrices = require("./updAllUserPrices");
const updatePrice = require("../../models/updateDB/updatePrice");

const { all } = require("axios");
const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "../../", "/data/arrayOfItems.json");

let _items = [];

const setItemsQuery = (arr) => {
  // console.log(arr);

  // const id = arr._id.toString();

  const codesDeck = [];
  const itemsDeck = [];

  // creating deck with item codes
  arr.forEach((el) => {
    if (el.userData.length === 0) {
      return;
    }

    for (i = 0; i < el.userData.length; i++) {
      if (!codesDeck.includes(el.userData[i].data.itemCode)) {
        codesDeck.push(el.userData[i].itemCode);
        itemsDeck.push({ ...el.userData[i], query: [el._id.toString()] });
      } else {
        for (j = 0; j < itemsDeck.length; j++) {
          if (itemsDeck[j].itemCode == el.userData[i].data.itemCode) {
            itemsDeck[j] = { ...itemsDeck[j], query: [...itemsDeck[j].query, el._id.toString()] };
          }
        }
      }
    }
  });

  // console.log(itemsDeck);
  return itemsDeck;
};

const checkUsersPrices = async () => {
  const db = getDb().db("main").collection("users");
  const allUsers = await db.find().toArray();
  // console.log("working");
  // console.log(allUsers);
  const itemsQuery = setItemsQuery(allUsers);
  const updatedItems = await updateAllUsersPrices(itemsQuery);
  updatePrice(updatedItems);
  // console.log(updatedItems)
  // console.log( itemsQuery)
  // fs.writeFile(p, JSON.stringify(allUsers), err => console.log(err));
};

mongoConnect(() => {
  // console.log("connected!");
  checkUsersPrices();
});

// const connection = async () => {
//     const conn = await mongoConnect();
//     checkUsersPrices().catch(err => console.log(err))
// }

// connection()

module.exports = checkUsersPrices;
