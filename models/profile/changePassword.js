const mongodb = require("mongodb");
const getDb = require("../../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;


const changePassword = async (userId) => {

    const db = getDb().db("main").collection("users");

    try {

        const response = await db.findOne({ _id: new ObjectId(userId) })

        return response.ozon
    } catch (err) {
        console.log(err)
    }
};

module.exports = changePassword;