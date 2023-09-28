const puppeteer = require("puppeteer");

const { operateData } = require("./dom");

const urls = [
  "https://www.ozon.ru/product/proteinovyy-belkovyy-kokteyl-bez-sahara-dlya-pohudeniya-geneticlab-nutrition-whey-pro-1-199586524",
  "https://www.ozon.ru/product/l-karnitin-dlya-pohudeniya-geneticlab-nutrition-150-gramm-yabloko-l-carnitine-poroshok-200173419",
  "https://www.ozon.ru/product/palto-uteplennoe-kw-843413076/?sh=wRh0fotuPg",
  "https://www.ozon.ru/product/sheyker-obem-500-ml-razmer-11h26-5-sm-tsvet-zelenyy-537970191"
];

const k = 3;

const getTheDOM = async (url, userId) => {
  
  url = url ? url : urls[k];

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ["--disable-setuid-sandbox", "--no-sandbox"],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const cookies = await page.cookies();

  const htmlPage = await page.content();
  
  if (!!htmlPage.match(/CloudFlare/gi)) {
    await page.click('checkbox', {x: 3, y: 4})
  } else {

    
    // fs.writeFile(p, JSON.stringify(htmlPage), (err) => console.log(err));
    // operateData(htmlPage, url[k], userId);

    // const title = await page.title();

    await browser.close();
  }

};

getTheDOM(urls[0]);

module.exports = getTheDOM;
