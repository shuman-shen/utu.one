const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  currency: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  open: {
    type: Number,
    min: 0,
    required: true,
  },
  high: {
    type: Number,
    min: 0,
    required: true,
  },
  low: {
    type: Number,
    min: 0,
    required: true,
  },
  close: {
    type: Number,
    min: 0,
    required: true,
  },
  volume: {
    type: Number,
    min: 0,
    required: true,
  },
  marketCap: {
    type: Number,
    min: 0,
    required: true,
  },
});

const PriceList = mongoose.model("PriceList", schema);

const validatePriceList = (priceList) => {
  const schema = {
    currency: Joi.string().min(1).max(100).required(),
    date: Joi.date().max("now").required(),
    open: Joi.number().min(0).precision(2).required(),
    high: Joi.number().min(0).precision(2).required(),
    low: Joi.number().min(0).precision(2).required(),
    close: Joi.number().min(0).precision(2).required(),
    volume: Joi.number().min(0).required(),
    marketCap: Joi.number().min(0).required(),
  };

  return Joi.validate(priceList, schema);
};

exports.PriceList = PriceList;
exports.validatePriceList = validatePriceList;
