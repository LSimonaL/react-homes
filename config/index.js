const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  port: process.env.PORT,
  mongoDbURL: process.env.mongoDbURL,
  jwtSecret: process.env.JWT_SECRET,
};