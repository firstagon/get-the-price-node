const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const getRoute = require("../routes/getRoute");

// puppeteer 

const { parse, stringify, toJSON, fromJSON } = require("flatted");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "dom.json"
);

const accept =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 OPR/95.0.0.0";

// const writeFile = (data) => {
//   fs.writeFile(p, data, (error) => {
//     console.log("ERROR FS WRITE", error);
//   });
// };

// const getDOM = (url, cb) => {
//   fetch(url)
//     .then((data) => {
//       console.log(toJSON(data));
//       writeFile(toJSON(data));
//     })
//     .catch((err) => console.log(">>>>ERRRR", err));
// };

const url =
  "https://www.ozon.ru/product/palto-uteplennoe-kw-843413076/?sh=wRh0fotuPg";

// const getDOM = async () => {
//   const response = await axios.get(
//     "https://www.ozon.ru/product/natura-siberica-gel-posle-britya-yak-i-yeti-muzhskoy-150-ml-32705217/?sh=wRh0fnhIdw",
//     { httpAgent }, { httpsAgent });
//   const html = response.data;
//   console.log("HTMLLLLLLLLLLLLL", html);
// };

const getDOM = () => {
  axios({
    method: "get",
    url: url,
    responseType: "document",
    timeout: 5000,
    withCredentials: true,
    maxRedirects: 5,
  })
    .then((resp) => console.log(resp.status))
    .catch((err) => {
      console.log(err.response.status);
      console.log(err.response.headers);
      console.log(err.toJSON());
    });
};

getDOM();

const getDOMe = (url, cb) => {
  // console.log(url);
  // return;

  // JSDOM.fromURL(url).then((dom) => {
  //   console.log(dom.serialize());
  //   getRoute.sendError(dom.serialize());
  // });

  axios
    .get(url, { headers: { "User-Agent": userAgent, accept: accept } })
    .then((response) => {
      // return console.log(">>>RESPONSE WORKED", response.url);
      // console.log(response)
      fs.writeFile(p, JSON.stringify(response.data), (error) => {
        console.log("32 ERROR FS WRITE", error);
      });
    })
    .catch((err) => {
      // console.log('DEFAULT ERROR')
      // console.log(">>>> AXIOS ERROR", err.code, err.message, err, "<<<<");
      // fs.writeFile(p, err.response.data, (error) => {
      //   console.log("31 ERROR FS WRITE", error);
      // });
      // const dom = new JSDOM(err.response.data);
      // const currPrice = dom.window.document.getElementsByTagName('span');
      // console.log(currPrice)
    });
};

module.exports = getDOM;

// axios.interceptors.response.use(
//   (res) => {
//     console.log("interceptor");
//   },
//   (err) => {
//     console.log("INTERCEPTOR ERROR");
//     getRoute.sendError(err);
//   }
// );
