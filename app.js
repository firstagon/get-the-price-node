const http = require("http");
const express = require("express");
const path = require("path");
// const mongoConnect = require('./db/mongo');


const { getDb } = require("./db/mongo");
const findUser = require("./models/users").findUser;
const mongoConnect = require("./db/mongo").mongoConnect;

const hostname = "127.0.0.1";
const port = process.env.PORT || 3030;
const MONGO_DATABASE = "mongodb://127.0.0.1:27017/main";

const app = express();

const getRoute = require("./routes/getRoute");
const authRoute = require("./routes/auth");

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

app.use("/", getRoute);
app.use("/auth", authRoute);

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