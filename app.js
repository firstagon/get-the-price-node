const http = require("http");
const express = require("express");
const path = require("path");
// const mongoConnect = require('./db/mongo');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const {getDb} = require('./db/mongo');


const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
const MONGO_DATABASE = 'mongodb://127.0.0.1:27017/';

const app = express();

const store = new MongoDBStore({
  uri: MONGO_DATABASE,
  collection: 'sessions'
})

store.on('error', (error) => console.log(error));

app.use(session({
  secret: 'dont tell ya',
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
  store: store,
  resave: true,
  saveUninitialized: true,
}))

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

// mongoConnect((client) => {
  // console.log(client);
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    getDb(client => {
      console.log("Client is" + client)
    })

  });
// })
console.log(store)