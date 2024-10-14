const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      unique: true,
      required: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitedHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URLModel = mongoose.model("url", urlSchema);

module.exports = URLModel;
