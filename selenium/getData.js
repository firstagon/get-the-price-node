const { By, Builder, Browser } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");

const url1 = 'https://www.ozon.ru/product/krossovki-nike-team-hustle-d-10-gs-879724244/?campaignId=277';

const getData = async (url, userId) => {
    let arr = [];

    driver = await new Builder().forBrowser('chrome').build();


    await driver.get(url);
    await driver.manage().addCookie({ name: 'key', value: 'value' });

    await driver.manage().setTimeouts({ implicit: 10000 });
    // getting price
    const allSpans = await driver.findElements(By.tagName('span'));
    for (let e of allSpans) {
        const price = await e.getText();
        if (price.slice(-1) === '₽') {
            arr.push(price)
        }
    }
    const price = +arr[0].slice(0, -1).split(' ').join('');
    console.log(price);

    await driver.quit(); 



}

getData(url1);

exports.getData = getData;