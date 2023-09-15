const mongodb = require("mongodb");
const getDb = require("../../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;


const getUserItems = async (userId) => {

  const db = getDb().db("main").collection("users");

  try{

 const response = await db.findOne({ _id: new ObjectId(userId) })
   
 return response.userData
  } catch(err) {
    console.log(err)
  }
};

module.exports = getUserItems;