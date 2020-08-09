const server = require("./app");
const { port } = require("./config");
const PORT = port || 5000;
server.listen(PORT, () =>
  console.log(`
    SERVER RUNNING ON PORT: ${PORT}`)
);