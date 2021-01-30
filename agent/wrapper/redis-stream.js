/* eslint-disable padded-blocks */
/* eslint-disable no-restricted-syntax */
const config = require('config');
const Redis = require('ioredis');



const redisConfig = config.get('redisConnect');
console.log('REDIS CONFIG', redisConfig, process.env.NODE_ENV);
const redis = new Redis(redisConfig);
redis.on('connect', () => {
  console.log('Redis is connected!');
  
});


const redisStream = {};

// assign stream name from config file to module property
redisStream.streamName = config.get('redisStream.REDIS_STREAM_NAME');


// function to append log to Redis stream 
redisStream.writeRedisStream = (streamName, logObj) => {
  //  convert object to array before writing to stream
  Redis.Command.setArgumentTransformer('xadd', (args) => {
    // args[0] -> stream name 
    // args[1] -> id 
    // args[2] -> log object
    if (args.length === 3) {
      const argArray = [];
      argArray.push(args[0], args[1]);
      const logKeyValObject = args[2];
      // convert {key: val} object pairs to individual array elements
      const logKeys = Object.keys(logKeyValObject);
      logKeys.forEach(key => {
        argArray.push(key, logKeyValObject[key]);
      })
      return argArray;
    }
    console.log('ATTN: Write format does not conform to 3 argument template above');
    return args;
  });
  
  // xadd method appends to Redis stream
  redis.xadd(streamName, '*', logObj)
    .then(id => {
      console.log(`Successfully wrote to Redis stream -- ${streamName} -- with id: ${id}`);
      return id;
    })
    .then(id => {
      console.log(id, streamName)
      return readRedisStream(streamName, id, id);
    })
    .catch(err => console.log(`Error writing to Redis stream: ${err}`));
};


// FIXME for testing purposes only. delete before shipping to production
function readRedisStream(streamName, min, max) {
  console.log(`invoked with id ${min} and streamName ${streamName}`)
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
  
  
  redis.xrange(streamName, min, max)
    .then(log => {
      console.log('READING LATEST REDIS STREAM', log);
      // console.log(`Successfully read from Redis stream -- ${streamName}: ${parsedLog}`)
    })
    .catch(err => console.log(`Error reading from Redis stream: ${err}`));
};

module.exports = redisStream;
