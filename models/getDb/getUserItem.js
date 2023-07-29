const mongodb = require("mongodb");
const getDb = require("../../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// const mongoConnect = require("../../db/mongo").mongoConnect;

const getUserItem = async (userId, itemId) => {
  const db = getDb().db("main").collection("users");

  // console.log(+itemId);

  try {
    const response = await db.findOne(
      // { _id: new ObjectId(userId) }
      // { _id: new ObjectId(userId), userData: { $elemMatch: { 'itemCode': +itemId } } }
      { _id: new ObjectId(userId), userData: { $elemMatch: { itemCode: +itemId } } }
      // { _id: new ObjectId(userId), 'userData.itemCode': +itemId } 
    );
    const specifiedItem = response.userData.find(el => el.itemCode == itemId);
    return specifiedItem;
  } catch (err) {
    console.log(err);
  }
};

// mongoConnect(() => {
//   getUserItems("645d1c5b8bbca8a986435ead");
// });
module.exports = getUserItem;
