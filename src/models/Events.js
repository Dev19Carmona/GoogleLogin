const mongoose = require("mongoose");
const collectionName = "Event";

const Schema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, require: true },
    dateInfo: {
      datetime: { type: Date, default: null },
      month: { type: Number, default: null },
      year: { type: Number, default: null },
      day: { type: Number, default: null },
    },
    total: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    participants: { type: Array, default: [] },
    isRemove: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    _id: false,
    versionKey:false,
  }
);
module.exports = mongoose.model(collectionName, Schema);
