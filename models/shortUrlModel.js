const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    original_url: {
      type: String,
      required: true,
      trim: true,
    },
    short_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const shortUrlModel = mongoose.model("shorturl", shortUrlSchema);

module.exports = shortUrlModel;
