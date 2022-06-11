const Livestock = require("../../models/Livestock");
const { getLivestockByIdController } = require("./getLivestockByIdController");

async function deleteLivestockController(id) {
  try {
    livestockToDelete = await getLivestockByIdController(id);
    if (livestockToDelete.message === "Cannot find livestock") {
      return livestockToDelete;
    } else {
      await Livestock.remove({ _id: id });
      return { message: "Livestock removed successfully" };
    }
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = { deleteLivestockController };
