const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const writeData = require("../models/writeData");

const p = path.join(__dirname, "../data", "scrapped.json");

const setDOM = () => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const currDOM = JSON.parse(fileContent);

      const itemPrice = +currDOM.match(/price\"\:\"[0-9]{1,10}/gi)[0].split('"')[2];
      const priceCurrency = currDOM.match(/priceCurrency\"\:\"[a-z]+/gi)[0].split('"')[2];
      const itemCode = +currDOM.match(/sku\"\:\"[0-9]{1,}/gi)[0].split('"')[2];
      const itemName = currDOM.match(/name\"\:\"[а-яa-z ]+/gi);
      const brand = currDOM.match(/brand\"\:\"[а-яa-z ]+/gi)[0].split('"')[2];
      const desc = currDOM.match(/description\"\:\"[а-яa-z\ \-\,\.\(\)0-9\:\;]+/gi)[0].split('"')[2];
      const imageUrl = currDOM.match(/image\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
      const itemUrl = currDOM.match(/url\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
      const itemRating = +currDOM.match(/ratingValue\"\:\"[0-9\.]+/gi)[0].split('"')[2];
    }
  });
};

// setDOM();

exports.operateData = (data, url, sesId) => {
  const currDOM = data;

  const outOfStock = currDOM.match(/Этот товар закончился/gi) ? true : false;
  if (outOfStock) {
    console.log(">>>>>>>>>>>>>Item out of stock!<<<<<<<<<<<<<<");
    return;
  } else {
    // console.log(currDOM.match(/price\"\:\"[0-9]{1,10}/gi))

    const itemPrice = +currDOM.match(/price\"\:\"[0-9]{1,10}/gi)[0].split('"')[2];
    const priceCurrency = currDOM.match(/priceCurrency\"\:\"[a-z]+/gi)[0].split('"')[2];
    const itemCode = +currDOM.match(/sku\"\:\"[0-9]{1,}/gi)[0].split('"')[2];
    const itemName = currDOM.match(/name\"\:\"[а-яa-z- .]+/gi)[0].split('"')[2];
    const brand = currDOM.match(/brand\"\:\"[а-яa-z ]+/gi);
    const desc = currDOM.match(/description\"\:\"[а-яa-z\ \-\,\.\(\)0-9\:\;]+/gi);
    const imageUrl = currDOM.match(/image\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
    const itemUrl = currDOM.match(/url\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
    const itemRating = +currDOM.match(/ratingValue\"\:\"[0-9\.]+/gi)[0].split('"')[2];

    const data = {
      date: new Date().toString(),
      itemPrice,
      priceCurrency,
      itemCode,
      itemName,
      brand: brand ? brand[0].split('"')[2] : 'Отсутствует',
      desc: desc ? desc[0].split('"')[2] : 'Продавец решил отказаться от описания',
      imageUrl,
      itemUrl,
      itemRating,
    };

    writeData(data, sesId);
  }
};