const getUserItem = require("../models/getDb/getUserItem");
const setfavorite = require('../models/updateDB/setFavorite');

const setFav = async (req, res, next) => {
    const token = req.body.token;
    const userId = req.body.userId;
    const itemCode = req.body.itemCode;
    const isFav = req.body.isFav;

    console.log(req.body)

    let message = isFav ? 'Add to favorite' : 'Deleted from favorite'

    try {
        setfavorite(userId, itemCode, isFav);
    } catch (err) {
        console.log(err)
        message = err;
    }

    res.status(200).json({ message, itemCode });
};


exports.setFav = setFav;