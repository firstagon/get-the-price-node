const mongodb = require("mongodb");
const getDb = require("../db/mongo").getDb;
const ObjectId = mongodb.ObjectId;

exports.findUser = (sessionObj) => {
  const id = sessionObj.id;
  getDb((client) => {
    const sessions = client.db("main").collection("sessions");
    const users = client.db("main").collection("users");
    users
      .findOne({ lastSessionId: id })
      .then((res) => {
        // console.log(res)
        const check = res ? true : false;
        if (check) {
          console.log("exist");
          users.updateOne(
            { lastSessionId: id },
            { lastSeen: new Date().toLocaleString() },
            {
              history: {
                $addToSet: { visited: new Date().toLocaleString(), 
                oldSessions: { cookie: { id, ...sessionObj.cookie } } },
              },
            }
          );
          console.log(res);
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
              oldSessions: [{sessionId: id, cookie: sessionObj.cookie}],
            },
          });
        }
      })
      .catch((err) => console.log(err));
  });
};

exports.addData = () => {
  // .findOne({ session: { $elemMatch: { sessionId: id } } })
  //     .then((res) => {
  //       // console.log(res)
  //       const check = res ? true : false;
  //       if (check) {
  //         console.log("exist");
  //         users.updateOne(
  //           { session: { $elemMatch: { sessionId: id } } },
  //           {
  //             $addToSet: { lastSeen: new Date().toLocaleString() },
  //           }
  //         );
};
