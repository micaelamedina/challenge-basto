const { Router } = require("express");
const {
  deleteLivestockController,
} = require("../controllers/deleteLivestockController");
const router = Router();

// Delete one livestock.
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLivestock = await deleteLivestockController(id);
    res.json(deleteLivestock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
