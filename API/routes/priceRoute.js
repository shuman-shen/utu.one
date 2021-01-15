const express = require("express");
const moment = require("moment");
const { PriceList } = require("../models/priceModel");

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const currencyList = await PriceList.distinct("currency");
    const count = currencyList.length;
    let latest = await PriceList.find(
      {},
      { currency: 1, date: 1, open: 1, close: 1, volume: 1, marketCap: 1 }
    )
      .sort({ date: -1 })
      .limit(count)
      .sort({ currency: 1 });
    //console.log(latest);
    const { date } = latest[0];

    const prevOneMonth = moment(date).subtract(1, "months"); //duration for 1 month

    const oneMonth = await PriceList.find(
      { date: prevOneMonth },
      { currency: 1, date: 1, close: 1 }
    ).sort({
      currency: 1,
    });
    //console.log(oneMonth);
    const prevSevenDays = moment(date).subtract(7, "days");
    const sevenDays = await PriceList.find(
      { date: prevSevenDays },
      { currency: 1, date: 1, close: 1 }
    ).sort({
      currency: 1,
    });
    //console.log(sevenDays);
    const result = latest.map((item, index) => {
      let newItem = { ...item.toJSON() };

      if (newItem.currency === sevenDays[index].currency) {
        const sevenDaysDiff =
          (newItem.close - sevenDays[index].close) / sevenDays[index].close;
        newItem = { ...newItem, sevenDaysDiff };
      }

      if (newItem.currency === oneMonth[index].currency) {
        const oneMonthDiff =
          (newItem.close - oneMonth[index].close) / oneMonth[index].close;
        newItem = { ...newItem, oneMonthDiff };
      }

      // reflect changes in 24hrs
      const oneDayDiff = (item.close - item.open) / item.open;
      return { ...newItem, oneDayDiff };
    });

    // sort result in desc order of market cap
    result.sort((a, b) => {
      const x = a.marketCap;
      const y = b.marketCap;
      return x < y ? 1 : x > y ? -1 : 0;
    });

    res.send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
