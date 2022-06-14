const Livestock = require("../../models/Livestock");
const { getLivestockByIdController } = require("./getLivestockByIdController");

// Controller function for updating of the livestock.
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
    await Livestock.updateOne(
      { _id: id },
      {
        $set: {
          idSenasa,
          animalType,
          weight,
          namePaddock,
          deviceType,
          deviceNumber,
        },
      }
    );
    return { message: "Update" };
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = { updateLivestockController };
