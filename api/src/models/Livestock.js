const mongoose = require("mongoose");
const { Schema } = mongoose;

// Database model with Mongoose.
const livestockSchema = new Schema({
  idSenasa: {
    type: String,
    required: true,
    unique: true,
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

// Los datos de los animales a guardar y sus tipos son:
// ● ID SENASA (Alfanumerico 16 chars)
// ● Tipo Animal (Novillo, Toro, Vaquillona)
// ● Peso animal (kg)
// ● Nombre de potrero.(Texto hasta 200 chars)
// ● Tipo de Dispositivo (COLLAR, CARAVANA)
// ● Número de dispositivo. (Alfanumerico 8 caracteres)
