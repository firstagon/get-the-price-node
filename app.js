const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

const updItemsByTime = require('./middleware/autoExecute/updItemsByTime');

const mongoConnect = require("./db/mongo").mongoConnect;

const hostname = "127.0.0.1";
const port = process.env.PORT || 3030;



const getRoute = require("./routes/getRoute");
const authRoute = require("./routes/auth");

// app.use(express.static(path.join(__dirname, "/public")));
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
  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  updItemsByTime();
});