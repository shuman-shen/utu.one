const mongoose = require("mongoose");
const { PriceList: PriceModel } = require("../models/priceModel");
const csvtojson = require("csvtojson");

module.exports = () => {
  const db = "mongodb://localhost/cryptocurrency";
  const file = "./crypto_historical_data.csv";
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to ${db}.`);
    })
    .catch((err) => console.log(err.message));

  // reset collection
  mongoose.connection
    .collection("pricelists")
    .drop()
    .then(() => console.log("Reset dataset collection..."))
    .catch((err) => {
      if (err.message !== "ns not found") {
        console.log(err.message);
      } else console.log("Initializing database...");
    });

  // convert CSV to JSON
  csvtojson({
    noheader: false,
    headers: [
      "currency",
      "date",
      "open",
      "high",
      "low",
      "close",
      "volume",
      "marketCap",
    ],
    colParser: {
      open: (item) => {
        const data = item.split(",").join("");
        return parseFloat(data);
      },
      high: (item) => {
        const data = item.split(",").join("");
        return parseFloat(data);
      },
      low: (item) => {
        const data = item.split(",").join("");
        return parseFloat(data);
      },
      close: (item) => {
        const data = item.split(",").join("");
        return parseFloat(data);
      },
      volume: (item) => {
        const data = item.split(",").join("");
        return parseInt(data);
      },
      marketCap: (item) => {
        const data = item.split(",").join("");
        return parseInt(data);
      },
    },
  })
    .fromFile(file)
    .then((jsonObj) => {
      PriceModel.insertMany(jsonObj);
      //console.log("CSV stored to MongoDB");
    })
    .catch((err) => console.log(err.message));
};
