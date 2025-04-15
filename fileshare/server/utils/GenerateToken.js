const DataModel = require("../models/Data");

const generateToken = async () => {
  let token;
  while (true) {
    token = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0");
    let TokenFound = await DataModel.findOne({ uniqueId: token });
    if (!TokenFound) {
      break;
    }
  }

  return token;
};

module.exports = { generateToken };
