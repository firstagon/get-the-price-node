const http = require("http");
const express = require("express");
const path = require("path");
const mongoConnect = require('./db/mongo');

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

const app = express();

// const apiRoutes = require("./routes/apiRoutes");
const getRoute = require('./routes/getRoute')

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

app.get('/', getRoute.sendPage);

app.post('/', getRoute.getURL);

// app.get('/', getRoute.sendError);

// app.use('/url', getRoute.redirectError);

app.get('/url', getRoute.sendError);

// app.get("/", getAPI.getAPI);

mongoConnect((client) => {
  console.log(client);
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})

