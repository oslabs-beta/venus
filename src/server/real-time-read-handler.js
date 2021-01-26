const { read } = require('fs');
const Redis = require('ioredis'); 
require('dotenv').config();

//Name of stream we are reading from
const STREAM_KEY = process.env.STREAM_KEY; 
//Interval of the stream we are processing to determine the "real-time" statistics
const INTERVAL = process.env.RT_INTERVAL;
//Rate at which we want to query the stream for data
const PING_RATE = process.env.RT_PING_RATE; 
//Where Redis is being hosted (either local machine or elasticache)
const REDIS_HOST = process.env.REDIS_HOST; 
//Which port Redis is connected to - usually 6379
const REDIS_PORT = process.env.REDIS_PORT; 

const redis = new Redis({
  port: REDIS_PORT, 
  host: REDIS_HOST
});

console.log(`Reading the stream named ${STREAM_KEY}...`); 

const readRedisStream = async () => {

  console.log('Invoked readredisstream function'); 

  //Get the milliseconds for start and end time
  const startTime = Date.now() - INTERVAL; 
  const endTime = startTime + INTERVAL;  

  streamEntries = await redis.xrange(STREAM_KEY, startTime, endTime); 

  console.log('XRANGE, response without reply transformer'); 
  console.log(streamEntries); 

  //Transform xrange's output from two arrays of keys and value into one array of log objects
  Redis.Command.setReplyTransformer('xrange', function (result) {
    if(Array.isArray(result)){
      const newResult = []; 
      for(const r of result){
        const obj = {
          id: r[0]
        }; 

        const fieldNamesValues = r[1]; 

        for(let i = 0; i < fieldNamesValues.length; i += 2){
          const k = fieldNamesValues[i]; 
          const v = fieldNamesValues[i + 1]; 
          obj[k] = v; 
        }

        newResult.push(obj); 
      }

      return newResult; 
    }

    return result; 
  }); 

  streamEntries = await redis.xrange(STREAM_KEY, startTime, endTime); 

  console.log('XRANGE, response with reply transformer'); 
  console.log(streamEntries); 

  return streamEntries; 

}

exports.readRedisStream = readRedisStream; 

// try {
//   setInterval(async () => { await readRedisStream()}, PING_RATE); 
// } catch (e) {
//   console.error(e); 
// }