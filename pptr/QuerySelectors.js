// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

const { operateData } = require("./dom");
const executablePath = '/usr/bin/google-chrome';

// const whitelist = [
//   'www.ozone.ru',
//   'ir.ozone.ru',
// ];

const urls = ["https://www.ozon.ru/product/igrovoy-kovrik-dlya-myshi-108-music-jacquard-professional-glide-black-topographica-xl-belyy-chernyy-1314273790/",
  "https://www.ozon.ru/product/proteinovyy-belkovyy-kokteyl-bez-sahara-dlya-pohudeniya-geneticlab-nutrition-whey-pro-1-199586524",
  "https://www.ozon.ru/product/l-karnitin-dlya-pohudeniya-geneticlab-nutrition-150-gramm-yabloko-l-carnitine-poroshok-200173419",
  "https://www.ozon.ru/product/palto-uteplennoe-kw-843413076/?sh=wRh0fotuPg",
  "https://www.ozon.ru/product/sheyker-obem-500-ml-razmer-11h26-5-sm-tsvet-zelenyy-537970191"
];

const k = 3;

const getTheDOM = async (url, userId) => {
  puppeteer.use(StealthPlugin());
  url = url ? url : urls[k];

  const browser = await puppeteer.launch({
    headless: 'new',
    // headless: false,
    args: ["--no-sandbox"],
    ignoreHTTPSErrors: true,
    // executablePath
  });
  const page = await browser.newPage();
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0');

  // await page.setRequestInterception(true);
  // page.on('request', (request) => {


  //   if (whitelist.includes(new URL(request.url()).host)) {
  //     if (['image', 'stylesheet', 'font', 'other', 'eventsource', 'media', 'texttrack', 'manifest', 'font'].indexOf(request.resourceType()) !== -1) {
  //       request.abort();
  //     } else {
  //       request.continue();
  //     }
  //   } else request.abort()

  // });

  await page.goto(url);
  const cookies = await page.cookies();

  let htmlPage = await page.content();

  if (!!htmlPage.match(/Checking your browser/gi)) {
    await page.waitForSelector('button')
    await page.click('button');
  }

  await page.waitForTimeout(5000)
  htmlPage = await page.content()
  // console.log(htmlPage)

  if (!!htmlPage.match(/CloudFlare/gi)) {
    await page.waitForTimeout(5000)
    await page.click('input', { x: 3, y: 4 })
    await page.waitForTimeout(5000)
    console.log('clicked');
    htmlPage = await page.content();
    operateData(htmlPage, url[k], userId);
    await browser.close();
  } else {

    // fs.writeFile(p, JSON.stringify(htmlPage), (err) => console.log(err));
    // console.log('operate')

    operateData(htmlPage, url, userId);

    // const title = await page.title();

    await browser.close();
  }

};

getTheDOM(urls[0]);

module.exports = getTheDOM;
