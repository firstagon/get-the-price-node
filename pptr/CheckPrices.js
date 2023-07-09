const puppeteer = require("puppeteer");

const path = require("path");

const p = path.join(__dirname, "../data", "scrappedEnded.json");
const fs = require("fs");
const checkPrice = async (url) => {

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

//   fs.writeFile(p, JSON.stringify(htmlPage), (err) => console.log(err));
  const newData = utilData(htmlPage, url);
  console.log(newData)
};

// getTheDOM(url);

module.exports = checkPrice;

const utilData = (data, url) => {
    // console.log("WWWWWWORKINng")
    const currDOM = data;
  
    // const dome = new JSDOM(data);
    // const getSpan = dome
    // console.log(getSpan)
  
    const outOfStock = currDOM.match(/Этот товар закончился/gi) ? true : false;
    if (outOfStock) {
      console.log(">>>>>>>>>>>>>Item out of stock!<<<<<<<<<<<<<<");
      // console.log(url)
    //   fs.writeFile(p, JSON.stringify(data), (err) => console.log(err));
    //   fs.writeFileSync(p, JSON.stringify(currDOM), (err) => console.log(err));
    // split(" ")
      // const itemPrice = currDOM.match(/price&quot;:&quot;[0-9].[0-9]{1,10}/gi)[0].split(';')[2].split(" ").join('');
      const itemPrice = +currDOM.match(/k8m\">[0-9].[0-9]{1,10}/gi)[0].split('>')[1].split(' ').join('')
    //   const itemPrice = +currDOM.match(/price&quot;:&quot;[0-9]{1,10}/gi)[0].split('"')[2];
    //   const itemPrice = +currDOM.match(/price\"\:\"[0-9]{1,10}/gi);
      // console.log(itemPrice)
      return {itemPrice: itemPrice ? itemPrice : false};
    } else {
      // console.log('reached')
      const itemPrice = +currDOM.match(/price\"\:\"[0-9]{1,10}/gi)[0].split('"')[2];
      const priceCurrency = currDOM.match(/priceCurrency\"\:\"[a-z]+/gi)[0].split('"')[2];
      const itemCode = +currDOM.match(/sku\"\:\"[0-9]{1,}/gi)[0].split('"')[2];
      const itemName = currDOM.match(/name\"\:\"[а-яa-z- .]+/gi)[0].split('"')[2];
      const brand = currDOM.match(/brand\"\:\"[а-яa-z ]+/gi);
      const desc = currDOM.match(/description\"\:\"[а-яa-z\ \-\,\.\(\)0-9\:\;]+/gi)[0].split('"')[2];
      const imageUrl = currDOM.match(/image\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
      const itemUrl = currDOM.match(/url\"\:\"[a-z0-9\/\\\:\.\-]+/gi)[0].split('"')[2];
      const itemRating = +currDOM.match(/ratingValue\"\:\"[0-9\.]+/gi)[0].split('"')[2];
  
      const data = {
        date: new Date().toString(),
        itemPrice,
        priceCurrency,
        itemCode,
        itemName,
        brand: brand ? brand[0].split('"')[2] : 'not set',
        desc,
        imageUrl,
        itemUrl,
        itemRating,
      };
      
      return data;
    }
  };