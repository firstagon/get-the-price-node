const checkPrice = require("../../pptr/CheckPrices");

const updateAllUsersPrices = async (array) => {
  // console.log('updating')
  const checkedArray = [];
  for (i = 0; i < array.length; i++) {
    const itemUrl = array[i].data.itemUrl;
    const checkItem = await checkPrice(itemUrl, array[i].data);
    // console.log(checkItem)
    if (!checkItem.ok) {
      throw new Error("Cant check item price!");
    }

    checkedArray.push({...checkItem, query: array[i].query} );
  }
  // console.log(checkedArray)
  return checkedArray;
};

module.exports = updateAllUsersPrices;
