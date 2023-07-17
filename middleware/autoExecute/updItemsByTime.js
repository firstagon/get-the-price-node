const { setTimeout } = require("timers/promises");
const checkUsersPrices = require("../../models/dbMiddleWare/updAllUserPrices");

const _status = { firstStart: true, date: null };

const _oneDay = 60 * 1000 * 60 * 24;
const _hours = 60 * 1000 * 60 * 8;
const _test = 5000;

const updItemsByTime = () => {
  if (_status.firstStart) {
    _status.date = new Date().getTime();
    _status.firstStart = false;
  }

  setInterval(() => {
    const refresh = new Date().getTime();
    if (_status.date + 12000 < refresh) {
      checkUsersPrices();
    }
  }, _hours);
};

// updItemsByTime();

module.exports = updItemsByTime;
