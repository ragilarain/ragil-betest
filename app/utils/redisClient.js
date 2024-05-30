const redis = require('redis');
const {redisUri} = require('../config')
// Replace with your Redis URI
const redisURI = redisUri; // Use your actual password and host details

const redisClient = redis.createClient({
  url: redisURI
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.connect(); // Note: connect is async and needs to be awaited in actual use

module.exports = redisClient;
