const mongoose = require("mongoose");
const { Schema } = mongoose;

// Database model with Mongoose.
const livestockSchema = new Schema({
  idSenasa: {
    type: String,
    required: true,
  },
  animalType: {
    type: String,
    enum: {
      values: ["Novillo", "Toro", "Vaquillona"],
      message: "You must select one of the preloaded animal types.",
    },
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  namePaddock: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    enum: {
      values: ["Collar", "Caravana"],
      message: "You must select one of the preloaded devices.",
    },
    required: true,
  },
  deviceNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Livestock", livestockSchema);
