import redis from 'redis'
import { config } from '../../config'
// import logger from "../../shared/core/Logger";

const { url } = config.redis
const redisClient = redis.createClient(url)

redisClient.on('connect', function () {
      // logger.info(`[Redis]: Connected to redis server at ${url}`);
      console.log(`[Redis]: Connected to redis server at ${url}`)
})

redisClient.on('error', function (err: Error) {
      // logger.error("[Redis]", { message: err.message });
      console.log('[Redis]', { message: err.message })
})

export { redisClient }
