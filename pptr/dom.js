const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const p = path.join(__dirname, "../data", "scrapped.json");

const setDOM = () => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const currDOM = JSON.parse(fileContent);
      // const dom = new JSDOM(currDOM);

      // const element = dom.window.document.querySelector("[price]");

      // console.log(element);
      // console.log(dom);

      // const re = /price...\d+\d/ig;
      // const re = /price\"\:\"[0-9]{1,10}/gi;

      const itemPrice = +currDOM.match(/price\"\:\"[0-9]{1,10}/gi)[0].split('"')[2];
      const priceCurrency = currDOM.match(/priceCurrency\"\:\"[a-z]+/gi)[0].split('"')[2];
      const itemCode = +currDOM.match(/sku\"\:\"[0-9]{1,}/gi)[0].split('"')[2];
      const itemName = currDOM.match(/name\"\:\"[а-яa-z ]+/gi);
      const brand = currDOM.match(/brand\"\:\"[а-яa-z ]+/gi)[0].split('"')[2];
      const desc = currDOM.match(/description\"\:\"[а-яa-z\ \-\,\.\(\)0-9\:\;]+/gi)[0].split('"')[2];
      const imageUrl = currDOM.match(/image\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
      const itemUrl = currDOM.match(/url\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
      const itemRating = +currDOM.match(/ratingValue\"\:\"[0-9\.]+/gi)[0].split('"')[2];
      

      // console.log(itemName);
      // console.log(brand);
      // console.log(+foundPrice[0].split('"')[2] + " " + priceCurrency);
      // console.log("Код товара: " + parseInt(itemCode));
      // console.log(desc);
      // console.log(itemCode);
    }
  });
};

setDOM();
