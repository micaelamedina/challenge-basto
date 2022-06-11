const { Router } = require("express");
const router = Router();
const {
  createLivestockController,
} = require("../controllers/createLivestockController");

// Create livestock.
router.post("", async (req, res) => {
  try {
    const create = await createLivestockController(req.body);
    if (create.message === "Livestock created") {
      res.status(201).json({ message: create.message });
    } else {
      res.status(404).json({ message: create.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
