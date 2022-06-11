const Livestock = require("../../models/Livestock");

async function getLivestockByIdController(id) {
  try {
    const livestock = await Livestock.findById(id);
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
