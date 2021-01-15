const expect = require("chai").expect;
const sinon = require("sinon");
const { PriceList } = require("../models/priceModel");
const { findAll } = require("./utility/data");
require("./utility/sino-mongoose");

describe("Get Price List", () => {
  describe("Count currency types", () => {
    it("should return the count of distinct currency types", async () => {
      sinon
        .mock(PriceList)
        .expects("distinct")
        .withArgs("currency")
        .resolves(11);

      const result = await PriceList.distinct("currency");
      expect(result).to.equal(11);
    });
  });

  describe("Query the latest price list", () => {
    it("should return a price list", async () => {
      sinon
        .mock(PriceList)
        .expects("find")
        .withArgs({}, { currency: 1, low: 1 })
        .chain("sort")
        .withArgs({ currency: -1 })
        .chain("limit")
        .withArgs(11)
        .resolves(findAll);

      const result = await PriceList.find({}, { currency: 1, low: 1 })
        .sort({ currency: -1 })
        .limit(11);
      expect(result).is.a("array");
      expect(result.length).to.equal(11);
    });
  });
});
