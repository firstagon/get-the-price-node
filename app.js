const http = require("http");
const express = require("express");
const path = require("path");
// const mongoConnect = require('./db/mongo');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { getDb } = require("./db/mongo");
var uid = require("uid-safe");
const findUser = require("./models/users").findUser;
const mongoConnect = require("./db/mongo").mongoConnect;

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
const MONGO_DATABASE = "mongodb://127.0.0.1:27017/main";

const app = express();

const store = new MongoDBStore({
  uri: MONGO_DATABASE,
  collection: "sessions",
});

store.on("error", (error) => console.log("error store" + " " + error));

app.use(
  session({
    secret: "k0zxc0QWe1",
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // maxAge: 60,
    },
  })
);

// app.use((req, res, next) => {

// })

// const apiRoutes = require("./routes/apiRoutes");
const getRoute = require("./routes/getRoute");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

// mongoConnect((client) => {
// console.log(client);

// app.on("req", () => {
//   console.log(req)
// })

// getDb((client) => {
// });
mongoConnect(() => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});

// })

app.use((req, res, next) => {
  // console.log('use me')
  // console.log(req.session.id)
  findUser(req.session);
  // findUser('req.session.id');
  next();
});

app.get("/", getRoute.sendPage);

app.post("/", getRoute.getURL);

// app.get('/', getRoute.sendError);

// app.use('/url', getRoute.redirectError);

app.get("/url", getRoute.sendError);

// app.get("/", getAPI.getAPI);
