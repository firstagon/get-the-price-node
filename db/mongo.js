const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    console.log('try to connect')
  MongoClient.connect("mongodb://localhost:27017/")
    .then((client) => {
      console.log("connected");
      callback(client);
    })
    .catch((err) => console.log("ERROR TO CONNECT", err));
};

module.exports = mongoConnect;