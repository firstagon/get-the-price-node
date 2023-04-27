const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    console.log('trying to connect')
 MongoClient.connect("mongodb://127.0.0.1:27017/")
    .then((client) => {
      console.log("connected");
      callback(client);
    })
    .catch((err) => console.log("ERROR TO CONNECT", err));
};

mongoConnect((client) => {
  console.log(client.db('maib').collection('users'));

});

module.exports = mongoConnect;