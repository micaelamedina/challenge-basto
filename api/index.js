const server = require("./src/app");
const db = require("./src/db");

server.listen(3001, () => console.log("Listening on port 3001!"));
