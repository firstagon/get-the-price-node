const checkPrice = require("../../pptr/CheckPrices");

const updateAllUsersPrices = async (array) => {
  const checkedArray = [];
  for (i = 0; i < array.length; i++) {
    const itemUrl = array[i].data.itemUrl;
    const checkItem = await checkPrice(itemUrl, array[i].data);
    // console.log(checkItem)
    if (!checkItem.ok) {
      throw new Error("Cant check item price!");
    }

    checkedArray.push(checkItem);
  }
  return checkedArray;
};

module.exports = updateAllUsersPrices;
