const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDB: process.env.URL_MONGODB_DEV,
  urlDBTest: process.env.URL_MONGODB_DEV_TEST,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET_KEY,
  redisUri: process.env.REDIS_URI
};
