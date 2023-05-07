const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

exports.mongoConnect = (callback) => {
  console.log("check the connection to mongo db");
  //  MongoClient.connect("mongodb://127.0.0.1:27017/")
  //     .then((client) => {
  //       console.log("connected");
  //       callback(client);
  //     })
  //     .catch((err) => console.log("ERROR TO CONNECT", err));
  // };

  // mongoConnect((client) => {
  //   console.log(client.db('maib').collection('users'));
  //   const usersdb = client.db('maib').collection('users');
  //   // usersdb.insertOne()
  // });
};

exports.getDb = (callback) => {
  console.log("MONGO.JS -> trying to connect");
  const db = MongoClient.connect("mongodb://127.0.0.1:27017/")
    .then((client) => {
      console.log("MONGO.JS -> connected");
      //  callback(client);
      callback(client);
    })
    .catch((err) => console.log("ERROR TO CONNECT", err));
};

// module.exports = mongoConnect;
