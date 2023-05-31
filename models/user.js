const mongodb = require("mongodb");
const getDb = require("../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

exports.newUser = (email, name, password) => {
  // console.log("not exist");
  const db = getDb().db('main').collection('users');
  db
    .insertOne({
      _id: new ObjectId(),
      lastSeen: new Date().toLocaleString(),
      user: {
        name: name,
        email: email,
        password: password,
      },
      userData: [],
      history: {
        visited: [new Date().toLocaleString()],
      },
    })
    .then((res) => {return res})
    .catch((err) => {
      throw err;
    });
};
