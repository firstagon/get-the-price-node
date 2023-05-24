const http = require("http");
const express = require("express");
const path = require("path");
// const mongoConnect = require('./db/mongo');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { getDb } = require("./db/mongo");
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

const getRoute = require("./routes/getRoute");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use((req, res, next) => {
//   findUser(req.session);
//   next();
// });

app.use("/", getRoute);
// app.post("/", getRoute);

// app.get("/url", getRoute.sendError);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoConnect(() => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
