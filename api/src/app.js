const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const createLivestock = require("./routes/routes/createLivestock");
const deleteLivestock = require("./routes/routes/deleteLivestock");
const getLiveStock = require("./routes/routes/getLivestock");
const updateLivestock = require("./routes/routes/updateLivestock");
const getLivestockById = require("./routes/routes/getLivestockById");
require("./db");

const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from.
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, OPTIONS, PUT, DELETE"
  );
  next();
});
server.use(express.json());

server.use("/livestock", createLivestock);
server.use("/livestock", deleteLivestock);
server.use("/livestock", getLiveStock);
server.use("/livestock", updateLivestock);
server.use("/livestock", getLivestockById);

module.exports = server;
