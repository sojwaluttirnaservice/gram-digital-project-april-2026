const { createClient } = require('redis')
const { MY_TIME } = require('./redisKeys')

const redisClient = createClient({
  // url: 'redis://192.168.68.74:6379'
  url: `redis://${process.env.DB_HOST_DEV || process.env.DB_HOST}:6379`
})

function connectRedis() {
  redisClient.connect()
}

const testRedisConnection = async () => {
  try {
    await redisClient.ping(); // Sends "PING" to Redis
    return true;
  } catch (err) {
    console.error('Error:', err);
    return false
  }
}

const getRedisData = async (key) => {

  let cachedData = null;
  return cachedData;
  if (!testRedisConnection()) return cachedData;
  cachedData = await redisClient.get(key)
  if (cachedData) {
    cachedData = JSON.parse(cachedData)
  }
  return cachedData
}


const deleteRedisData = async (key) => {
  return;
  if (!testRedisConnection()) return;
  await redisClient.del(key)
}

const setRedisKey = async (key, storeData, expiration = MY_TIME.FIVE_HOURS) => {
  return;
  if (!testRedisConnection()) return null;
  return await redisClient.set(key, JSON.stringify(storeData), {
    EX: expiration
  })
}


module.exports = {
  connectRedis,
  redisClient,
  getRedisData,
  setRedisKey,
  deleteRedisData
}

/**
 * The above code connects to localhost on port 6379. To connect to a different host or port, use a connection string in the format redis[s]://[[username][:password]@][host][:port][/db-number]:

createClient({
  url: "redis://alice:foobared@awesome.redis.server:6380",
});
 */
