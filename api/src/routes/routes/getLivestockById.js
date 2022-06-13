const { Router } = require("express");
const router = Router();
const Livestock = require("../../models/Livestock");
const {
  getLivestockByIdController,
} = require("../controllers/getLivestockByIdController");

// Get livestock by ID Senasa.
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const livestockFilter = await getLivestockByIdController(id);
    res.json(livestockFilter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
