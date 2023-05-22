// import puppeteer from "puppeteer";

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../data", "scrapped.json");

const JSDOM = require("jsdom");

const { operateData } = require("./dom");

const urls = [
  "https://www.ozon.ru/product/proteinovyy-belkovyy-kokteyl-bez-sahara-dlya-pohudeniya-geneticlab-nutrition-whey-pro-1-199586524",
  "https://www.ozon.ru/product/l-karnitin-dlya-pohudeniya-geneticlab-nutrition-150-gramm-yabloko-l-carnitine-poroshok-200173419",
  "https://www.ozon.ru/product/palto-uteplennoe-kw-843413076/?sh=wRh0fotuPg",
  "https://www.ozon.ru/product/sheyker-obem-500-ml-razmer-11h26-5-sm-tsvet-zelenyy-537970191"
];

const k = 3;

const getTheDOM = async (url, sesId) => {
  
  url = url ? url : urls[k];

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const cookies = await page.cookies();

  const htmlPage = await page.content();

  await browser.close();

  fs.writeFile(p, JSON.stringify(htmlPage), (err) => console.log(err));
  operateData(htmlPage, url[k], sesId);
};

// getTheDOM(url);

module.exports = getTheDOM;
