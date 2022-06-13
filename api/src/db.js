require("dotenv").config();
const mongoose = require("mongoose");

// Import environment variables.
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
