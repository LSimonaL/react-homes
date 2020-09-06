//initializing server

const server = require("./app"); //creating app module
const { port } = require("./config");
const PORT = port || 5000;
server.listen(PORT, () =>
  console.log(`
    SERVER RUNNING ON PORT: ${PORT}`)
);