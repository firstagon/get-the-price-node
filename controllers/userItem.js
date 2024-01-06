const getUserItem = require("../models/getDb/getUserItem");

const getItem = async (req, res, next) => {
  const token = req.token;
  const userId = req.userId;
  const itemCode = req.params.itemId;

  const data = await getUserItem(userId, itemCode);

  console.log(data);

  if (!data || data == undefined) {
    return res.status(404).json({ data: false })
  }
  res.status(200).json({ ...data })
};

exports.getItem = getItem;
