const getDb = require("../../db/mongo").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const setFavorite = (userId, itemCode, isFav) => {
    const db = getDb().db("main").collection("users");
    db.updateOne(
        { _id: new ObjectId(userId) },
        {
            $set: {
                "ozon.$[a].favorite": isFav,
            }
        }, {
            arrayFilters: [{ "a.itemCode": itemCode }]
    }
    )
        .then()
        .catch((err) => { throw new Error(err) });
}

module.exports = setFavorite;