const mongodb = require("mongodb");
const getDb = require("../../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const getUserItem = async (userId, itemId) => {
  const db = getDb().db("main").collection("users");

  try {
    const response = await db.findOne(
      { _id: new ObjectId(userId), userData: { $elemMatch: { itemCode: +itemId } } }
    );
    const specifiedItem = response.userData.find(el => el.itemCode == itemId);
    return specifiedItem;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getUserItem;
