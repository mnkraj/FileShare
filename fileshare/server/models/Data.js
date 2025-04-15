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
      type: String, // Optional text field for storing any additional text
      default: "", // Default value in case no text is provided
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const Data = mongoose.model("data", dataSchema);

module.exports = Data;
