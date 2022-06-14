const { Router } = require("express");
const {
  updateLivestockController,
} = require("../controllers/updateLivestockController");
const router = Router();

// Update one livestock.
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  try {
    const deleteLivestock = await updateLivestockController(id, req.body);
    res.json(deleteLivestock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
