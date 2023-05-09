const mongodb = require("mongodb");
const getDb = require("../db/mongo").getDb;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

exports.findUser = (sessionObj) => {
  const id = sessionObj.id;
  // console.log(sessionObj);
  getDb((client) => {
    const sessions = client.db("main").collection("sessions");
    const users = client.db("main").collection("users");
    users
      .findOne({ lastSessionId: id })
      .then((res) => {
        // console.log(res)
        const check = res ? true : false;
        if (check) {
          // console.log("exist");
          users.updateOne(
            { lastSessionId: id },
            {
              $set: { lastSeen: new Date().toLocaleString() },
              $push: {
                "history.visited": {
                  $each: [new Date().toLocaleString()],
                  $position: 0,
                },
              },
              $addToSet: { "history.oldSessions": { sessionId: id, cookie: sessionObj.cookie } },
            }
          );
          // console.log(res);
        } else {
          console.log("not exist");
          users.insertOne({
            _id: new ObjectId(),
            lastSessionId: id,
            lastSeen: new Date().toLocaleString(),
            user: {
              name: "test",
              email: "e-test@smth.com",
              password: "qwerty",
            },
            userData: [],
            history: {
              visited: [new Date().toLocaleString()],
              oldSessions: [{ sessionId: id, cookie: sessionObj.cookie }],
            },
          });
        }
      })
      .catch((err) => console.log(err));
  });
};



const getData = async () => {
  console.log("USERS.JS -> trying to connect");
  // const db = MongoClient.connect("mongodb://127.0.0.1:27017/")
  //   .then((client) => {
  //     console.log("USERS.JS -> connected");
  //     // console.log(client)
  //     client;
  //   })
  //   .catch((err) => console.log("ERROR TO CONNECT", err));
  const response = await MongoClient.connect("mongodb://127.0.0.1:27017/");
  return response;
};

// console.log( getData())
// const smth = async () => {
//   const resp = await getData();
//   console.log(resp)
//   return resp
// }

// smth()

// const getDab = async () => {
//   return await getData();
// };

// class SesionUpd {
//   constructor(userName, userPass, userMail, request) {
//     this.name = userName;
//     this.password = userPass;
//     this.email = userMail;
//     this.request = request;
//     this.db;
//   }

//   async connect() {
//     this.db = await getDab();
//   }

//   async writeS() {
//     this.connect();
//     const db = await getDab();
//     this.db.db("main").collection("users").insertOne({ _id: new ObjectId(), name: "bob" });
//   }

//   logDb() {
//     console.log(this.db);
//   }
// }

// const nnm = new SesionUpd();
// nnm.writeS();

exports.addData = () => {};

// module.exports = SesionUpd;
