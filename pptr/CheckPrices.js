// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

const executablePath = '/usr/bin/google-chrome';

const checkPrice = async (url, item) => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: "new",
    // headless: false,
    args: ["--no-sandbox"],
    ignoreHTTPSErrors: true,
    // executablePath
  });

  const page = await browser.newPage();
  // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

  await page.goto(url);

  const cookies = await page.cookies();

  let htmlPage = await page.content();

  if (!!htmlPage.match(/Checking your browser/gi)) {
    await page.waitForSelector('button')
    await page.click('button');
  }

  await page.waitForTimeout(5000)
  htmlPage = await page.content();

  await browser.close();

  const currData = utilData(htmlPage, url);
  const newData = { currData: currData, url: url, prevData: item, ok: true };

  return newData;
};


module.exports = checkPrice;

const utilData = (data, url) => {

  const currDOM = data;

  const outOfStock = currDOM.match(/Этот товар закончился/gi) ? true : false;
  if (outOfStock) {
    const itemPrice = +currDOM
      .match(/&quot;price&quot;:&quot;[0-9]{1,10}.[0-9]{1,10}.[0-9]{1,10}/gi);

    const itemCode = +currDOM.match(/product_id=[0-9]{1,10}/gi)[0].split("=")[1];

    return {
      itemCode: itemCode,
      itemPrice: itemPrice ? itemPrice : false,
      date: new Date().toString(),
      available: false,
    };
  } else {
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
      itemPrice: itemPrice ? itemPrice : false,
      priceCurrency,
      itemCode,
      itemName,
      brand: brand ? brand[0].split('"')[2] : "not set",
      desc: desc ? desc[0].split('"')[2] : 'Продавец решил отказаться от описания',
      imageUrl,
      itemUrl,
      itemRating,
      available: true,
    };

    return data;
  }
};
