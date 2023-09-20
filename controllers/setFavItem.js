const getUserItem = require("../models/getDb/getUserItem");
const setfavorite = require('../models/updateDB/setFavorite');

const setFav = async (req, res, next) => {
    const token = req.token;
    const userId = req.userId;
    const itemCode = req.itemCode;
    const isFav = req.isFav;

    const message = isFav ? 'Add to favorite' : 'Deleted from favorite'

    try {
        setfavorite(userId, itemCode, isFav);
    } catch (err) {
        console.log(err)
        message = err;
    }

    res.status(200).json({ message, itemCode });
};


exports.setFav = setFav;