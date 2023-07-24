const mongodb = require("mongodb");
const getDb = require("../../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// const mongoConnect = require("../../db/mongo").mongoConnect;

const getUserItems = async (userId) => {

  const db = getDb().db("main").collection("users");

  try{

 const response = await db.findOne({ _id: new ObjectId(userId) })
    // .then((res) => res.userData)
    // .catch((err) => console.log(err));

    return response.userData
  } catch(err) {
    console.log(err)
  }
};


// mongoConnect(() => {
//   getUserItems("645d1c5b8bbca8a986435ead");
// });
module.exports = getUserItems;