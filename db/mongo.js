const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
let DB_URL = process.env.CONN_STR || 'mongodb://127.0.0.1:27017';
let _firstRun = true;

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

// mongoConnect(() => console.log('connected'))

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

