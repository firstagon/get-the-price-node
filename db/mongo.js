const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
let DB_URL = process.env.CONN_STR || 'mongodb://127.0.0.1:27017';
let _firstRun = true;

const createDB = () => {
  // MongoClient.connect(`${DB_URL}`).then(db => {
  // db.db('mainn').createCollection('users');
  // }).catch(err => console.log('err'))
}

const checkDB = (db) => {
  const isDb = db.db('main').collection('users');
  isDb.countDocuments().then(res => {
    if (res <= 0) {
      // createDB(db);
      db.db('main').createCollection('users');
    }
  }).catch(err => console.log(err))
}

const mongoConnect = (callback) => {


  MongoClient.connect(DB_URL)
    .then((res) => {
      console.log("MONGO.JS -> connected");
      _db = res;
      checkDB(_db);
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw " No database found";
};

mongoConnect(() => console.log('connected'))

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

/*
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

const getMongo = (callback) => {
  console.log("MONGO.JS -> trying to connect");
  const db = MongoClient.connect("mongodb://127.0.0.1:27017/")
    .then((client) => {
      console.log("MONGO.JS -> connected");
      //  callback(client);
      // callback(client);
      return client
    })
    .catch((err) => console.log("ERROR TO CONNECT", err));
    return db
};

exports.getDb = async () => {
  let response = await getMongo();
  const db = response;
  // if (!response.ok) {
  //   console.log(response.ok)
  //   console.log("MONGO.JS -> ERR to connect to mongo")
  //   return
  // } 

  // console.log(response);
  return db
}

// console.log(setDb())



// module.exports = mongoConnect;
*/
