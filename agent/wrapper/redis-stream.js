/* eslint-disable padded-blocks */
/* eslint-disable no-restricted-syntax */
const config = require('config');
const Redis = require('ioredis');

/**
 * initiate Redis instance
 */
const redisConfig = config.get('redisConnect');
const redis = new Redis(redisConfig);
redis.on('connect', () => {
  console.log('Redis is connected!');
});

/**
 * redisStream object will contain the streamName property and writeRedisStream() functionality
 */
const redisStream = {};

/* assign stream name from config file to module property */
redisStream.streamName = config.get('redisStream.REDIS_STREAM_NAME');

/**
 * Function to append log object to Redis stream.
 * The function first invokes Redis method .setArgumentTransformer() in order to adjust the output
 * of the 'xadd' Redis function.
 * In order for Redis to correctly interpret the object, each key and value needs to be passed in
 * as a separate string. Given that Redis Streams are append-only, this will maintain the order
 * of the key:value pairs, such that the object can be re-constructed upon reading the Stream.
 * @param {string} streamName
 * @param {object} logObj
 */
redisStream.writeRedisStream = (streamName, logObj) => {
  /**
   * error object constructor
   */
  function RedisException(message) {
    this.message = message;
    this.name = 'VenusRedisException';
  }

  Redis.Command.setArgumentTransformer('xadd', (args) => {
    /**
     * args[0] -> stream name
     * args[1] -> id
     * args[2] -> log object
     */
    const argArray = [];
    argArray.push(args[0], args[1]);
    const logKeyValObject = args[2];
    const logKeys = Object.keys(logKeyValObject);
    logKeys.forEach(key => {
      argArray.push(key, logKeyValObject[key]);
    });
    return argArray;
  });

  /**
   * Invoke Redis Stream .xadd() method
   * @argument streamName
   * @argument id -> '*' = auto-assign
   * @argument logObj
   */
  redis
    .xadd(streamName, '*', logObj)
    .then(id => readRedisStream(streamName, id, id))
    .catch(err => {
      throw new RedisException(`Error writing to Redis stream: ${err}`)
    });
};

// FIXME for testing purposes only. delete before shipping
function readRedisStream(streamName, min, max) {
  console.log(`invoked with id ${min} and streamName ${streamName}`);
  // deconstruct tuple array back to js object
  Redis.Command.setReplyTransformer('xrange', (streamResult) => {
    if (Array.isArray(streamResult)) {
      // convert reddis stream to array of objects
      // each object is a seperate log entry
      const newResult = [];
      for (const val of streamResult) {
        const obj = {
          id: val[0],
        };
        // array with original key:val pairs stored as consecutive values
        const logValues = val[1];
        for (let i = 0; i < logValues.length; i += 2) {
          const key = logValues[i];
          const value = logValues[i + 1];
          obj[key] = value;
        }
        newResult.push(obj);
      }
      return newResult;
    }
  });

  redis
    .xrange(streamName, min, max)
    .then((log) => {
      console.log('READING LATEST REDIS STREAM', log);
      // console.log(`Successfully read from Redis stream -- ${streamName}: ${parsedLog}`)
    })
    .catch((err) => console.log(`Error reading from Redis stream: ${err}`));
}

module.exports = redisStream;
