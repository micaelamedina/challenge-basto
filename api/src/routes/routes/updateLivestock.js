const { Router } = require("express");
const {
  updateLivestockController,
} = require("../controllers/updateLivestockController");
const router = Router();

// Update one livestock.
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateLivestock = await updateLivestockController(id, req.body);
    res.json(updateLivestock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
