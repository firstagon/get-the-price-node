// import puppeteer from "puppeteer";

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../data", "scrapped.json");

const JSDOM = require("jsdom");

const {operateData} = require("./dom");

const url = ["https://www.ozon.ru/product/proteinovyy-belkovyy-kokteyl-bez-sahara-dlya-pohudeniya-geneticlab-nutrition-whey-pro-1-199586524",
  "https://www.ozon.ru/product/palto-uteplennoe-kw-843413076/?sh=wRh0fotuPg",
  "https://developer.chrome.com/",
];

const getTheDOM = async (url, sesId) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const cookies = await page.cookies();

  const htmlPage = await page.content();

  await browser.close();

  // fs.writeFile(p, JSON.stringify(htmlPage), (err) => console.log(err));
  operateData(htmlPage, url[0], sesId);
};

// getTheDOM(url);

module.exports = getTheDOM;
