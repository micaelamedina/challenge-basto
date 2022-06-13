const Livestock = require("../../models/Livestock");

// Controller function for search by ID Senasa.
async function getLivestockByIdController(id) {
  try {
    const livestock = await Livestock.find({ idSenasa: id });
    if (livestock === null) {
      return { message: "Cannot find livestock" };
    } else {
      return livestock;
    }
  } catch (error) {
    return error;
  }
}

module.exports = { getLivestockByIdController };
