const Livestock = require("../../models/Livestock");

// Controller function for creation of new livestock.
async function createLivestockController({
  idSenasa,
  animalType,
  weight,
  namePaddock,
  deviceType,
  deviceNumber,
}) {
  const livestock = new Livestock({
    idSenasa,
    animalType,
    weight,
    namePaddock,
    deviceType,
    deviceNumber,
  });
  try {
    const newLivestock = await livestock.save();
    return { newLivestock, message: "Livestock created" };
  } catch (error) {
    return error;
  }
}

module.exports = { createLivestockController };
