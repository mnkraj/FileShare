const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    fileUrls: {
      type: [String],
    },
    text: {
      type: String, 
      default: "", 
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), 
      index: { expires: 0 }, // TTL index: expire exactly at `expireAt`
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const Data = mongoose.model("data", dataSchema);

module.exports = Data;
