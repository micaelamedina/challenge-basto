const Livestock = require("../../models/Livestock");
const { getLivestockByIdController } = require("./getLivestockByIdController");

// Controller function to remove an item.
async function deleteLivestockController(id) {
  try {
    livestockToDelete = await getLivestockByIdController(id);
    if (livestockToDelete.message === "Cannot find livestock") {
      return livestockToDelete;
    } else {
      await Livestock.deleteOne({ _id: id });
      return { message: "Livestock removed successfully" };
    }
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = { deleteLivestockController };
