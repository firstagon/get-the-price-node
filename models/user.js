const mongodb = require("mongodb");
const getDb = require("../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const bcrypt = require("bcryptjs");

exports.newUser = (email, password) => {
  // console.log("not exist");
  const db = getDb().db("main").collection("users");
  return db
    .insertOne({
      _id: new ObjectId(),
      lastSeen: new Date().toLocaleString(),
      user: {
        email: email,
        password: password,
      },
      userData: [],
      history: {
        visited: [new Date().toLocaleString()],
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

exports.findUser = async (email, password) => {
  const db = getDb().db("main").collection("users");
  let loadedUser;

  const response = await db.findOne({ "user.email": email });
  if (!response) {
    const error = new Error("A user with this email could not be found.");
    error.statusCode = 401;
    throw error;
  } else {
    loadedUser = response;
    const equal = await bcrypt.compare(password, loadedUser.user.password);
    return { isEqual: equal, email: loadedUser.user.email, id: loadedUser._id };
  }
};
