const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../../log", "updatingItems.txt");

const { setTimeout } = require("timers/promises");
const checkUsersPrices = require("../../models/dbMiddleWare/checkAllUsersPrices");

const _state = { firstRun: true };

const _oneDay = 60 * 1000 * 60 * 24;
const _hours = 60 * 1000 * 60 * 8;
const _test = 5000;

const getLastDate = () => {
  const buffer = fs.readFileSync(p, (err, resp) => {
    if (err) {
      console.log(err);
    }

    return resp;
  });
  const data = buffer.toString().split(/\r?\n/);
  // const lastElem = data[data.length-1];
  const lastElem = data.slice(-1)[0];
  return lastElem;
};

const updItemsByTime = async () => {
  const lastDate = new Date(getLastDate());
  const today = new Date();

  const stream = fs.createWriteStream(p, { flags: "a" });

  // console.log(lastDate.getTime())

  if (_state.firstRun) {
    // console.log('firstrun')
    if (lastDate.getTime() + _oneDay < today.getTime()) {
      console.log('started')
      await checkUsersPrices();
      stream.write(`\n${today.toString()}`);
    }
  }

  setInterval(() => {
    if (lastDate.getTime() + _oneDay < today.getTime()) {
      console.log('updating')
      stream.write(`\n${today.toString()}`);
        checkUsersPrices();
      // console.log("rerun");
    } else {
      console.log("too early for updating!");
    }
  }, _hours);

  // stream.end();
};

// updItemsByTime();

module.exports = updItemsByTime;
