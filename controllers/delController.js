const deleteItem = require("../models/updateDB/deleteItem");

exports.deletingController = (req, res, next) => {
  const userId = req.userId;
  const item = req.body.itemCode;

  deleteItem(itemCode, userId)
    .then((res) => {
      res.json({ data: "completed deleting item", date: new Date().toLocaleString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
