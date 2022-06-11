const { Router } = require("express");
const router = Router();
const Livestock = require("../../models/Livestock");

// Get livestock.
router.get("", async (req, res) => {
  try {
    const livestock = await Livestock.find();
    res.json(livestock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
