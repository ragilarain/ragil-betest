const redisClient = require('../utils/redisClient');

class CacheService {
    constructor(client) {
        this.client = client;
    }   
    async get(key) {
        try {
            const value = await this.client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting value from Redis:', error);
            return null;
        }
    }   
    async set(key, value, expiration = 3600) { // Default expiration time set to 1 hour
        try {
            await this.client.set(key, JSON.stringify(value), {
            EX: expiration,
        });
        } catch (error) {
            console.error('Error setting value in Redis:', error);
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Error deleting value in Redis:', error);
        }
    }
}

module.exports = new CacheService(redisClient);
