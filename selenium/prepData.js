const writeData = require("../models/writeData");

exports.operateData = (rarData) => {

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