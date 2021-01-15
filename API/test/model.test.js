const expect = require("chai").expect;
const sinon = require("sinon");
const { PriceList } = require("../models/priceModel");

describe("Price Model", () => {
  it("should be invalid if currency and date is empty", async () => {
    const validPrice = new PriceList({
      currency: "",
      date: "",
      open: 1.2,
      close: 1.3,
      low: 1.1,
      high: 1.5,
      volume: 23433545435,
      marketCap: 23423984732787,
    });
    try {
      await validPrice.validate();
    } catch (err) {
      expect(err.errors.currency.message).to.exist;
      expect(err.errors.date.message).to.exist;
    }

    //expect(result).to.be.undefined;
  });

  it("should be invalid if numeric fields are below zero", async () => {
    const validPrice = new PriceList({
      currency: "texo",
      date: "Dec 12, 2019",
      open: -1.2,
      close: -1.3,
      low: -1.1,
      high: -1.5,
      volume: -23433545435,
      marketCap: -23423984732787,
    });
    try {
      await validPrice.validate();
    } catch (err) {
      expect(err.errors.open.message).to.exist;
      expect(err.errors.close.message).to.exist;
      expect(err.errors.low.message).to.exist;
      expect(err.errors.high.message).to.exist;
      expect(err.errors.volume.message).to.exist;
      expect(err.errors.marketCap.message).to.exist;
    }
  });
  it("should be invalid if numeric fields contain any string", async () => {
    const validPrice = new PriceList({
      currency: "texo",
      date: "Dec 12, 2019",
      open: "sdf",
      close: "sdf",
      low: "sdf",
      high: "sdf",
      volume: "sdf",
      marketCap: "sdf",
    });
    try {
      await validPrice.validate();
    } catch (err) {
      expect(err.errors.open.message).to.exist;
      expect(err.errors.close.message).to.exist;
      expect(err.errors.low.message).to.exist;
      expect(err.errors.high.message).to.exist;
      expect(err.errors.volume.message).to.exist;
      expect(err.errors.marketCap.message).to.exist;
    }
    //expect(result).to.be.undefined;
  });
  it("should be invalid if any field is missing", async () => {
    const validPrice = new PriceList({});
    try {
      await validPrice.validate();
    } catch (err) {
      expect(err.errors.currency.message).to.exist;
      expect(err.errors.date.message).to.exist;
      expect(err.errors.open.message).to.exist;
      expect(err.errors.close.message).to.exist;
      expect(err.errors.low.message).to.exist;
      expect(err.errors.high.message).to.exist;
      expect(err.errors.volume.message).to.exist;
      expect(err.errors.marketCap.message).to.exist;
    }
    //expect(result).to.be.undefined;
  });
});
