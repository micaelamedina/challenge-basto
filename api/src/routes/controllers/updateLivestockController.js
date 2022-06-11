const Livestock = require("../../models/Livestock");
const { getLivestockByIdController } = require("./getLivestockByIdController");

async function updateLivestockController(id, data) {
  const {
    idSenasa,
    animalType,
    weight,
    namePaddock,
    deviceType,
    deviceNumber,
  } = data;
  try {
    await Livestock.findOneAndUpdate(id, {
      $set: {
        idSenasa,
        animalType,
        weight,
        namePaddock,
        deviceType,
        deviceNumber,
      },
    });
    return { message: "Update" };
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = { updateLivestockController };
