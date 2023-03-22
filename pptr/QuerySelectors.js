// import puppeteer from "puppeteer";

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../data", "scrapped.json");

const JSDOM = require("jsdom");

const url = [
  "https://www.ozon.ru/product/palto-uteplennoe-kw-843413076/?sh=wRh0fotuPg",
  "https://developer.chrome.com/",
];

const getTheDOM = async (url, cb) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(url[0]);

  const cookies = await page.cookies();

  const htmlPage = await page.content();

  await browser.close();

  fs.writeFile(p, JSON.stringify(htmlPage), (err) => console.log(err));
};

getTheDOM(url);
