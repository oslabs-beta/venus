const { read } = require('fs');
const Redis = require('ioredis'); 
// const config = require('config'); 
require('dotenv').config(); 

//Name of stream we are reading from
const STREAM_KEY = process.env.STREAM_KEY; 
// const STREAM_KEY = config.get('STREAM_KEY'); 
//Interval of the stream we are processing to determine the "real-time" statistics
const INTERVAL = process.env.RT_INTERVAL;
// const INTERVAL = config.get('RT_INTERVAL');
//Rate at which we want to query the stream for data
const PING_RATE = process.env.RT_PING_RATE; 
// const PING_RATE = config.get('RT_PING_RATE'); 
//Where Redis is being hosted (either local machine or elasticache)
const REDIS_HOST = process.env.REDIS_HOST; 
// const REDIS_HOST = config.get('REDIS_HOST'); 
//Which port Redis is connected to - usually 6379
const REDIS_PORT = process.env.REDIS_PORT; 
// const REDIS_PORT = config.get('REDIS_PORT'); 

const redis = new Redis({
  host: process.env.REDIS_HOST, 
  port: process.env.REDIS_PORT
});

console.log(`Reading the stream named ${STREAM_KEY}...`); 
  
const readRedisStream = async () => {

  //Get the milliseconds for start and end time
  const startTime = Date.now() - INTERVAL; 
  const endTime = startTime + INTERVAL;  

  // Transform xrange's output from two arrays of keys and value into one array of log objects
  Redis.Command.setReplyTransformer('xrange', function (result) {
    if(Array.isArray(result)){
      const newResult = []; 
      for(const r of result){
        const obj = {
          id: r[0]
        }; 

        const fieldNamesValues = r[1]; 

        const reqHost = fieldNamesValues.indexOf('reqHost'); 
        const reqHostValue = reqHost + 1;
        obj['reqHost'] = fieldNamesValues[reqHostValue];

        const reqMethod = fieldNamesValues.indexOf('reqMethod'); 
        const reqMethodValue = reqMethod + 1;
        obj['reqMethod'] = fieldNamesValues[reqMethodValue]; 
        
        const reqPath = fieldNamesValues.indexOf('reqPath'); 
        const reqPathValue = reqPath + 1;
        obj['reqPath'] = fieldNamesValues[reqPathValue];
        
        const reqUrl = fieldNamesValues.indexOf('reqUrl'); 
        const reqUrlValue = reqUrl + 1;
        obj['reqUrl'] = fieldNamesValues[reqUrlValue];

        const resStatusCode = fieldNamesValues.indexOf('resStatusCode'); 
        const resStatusCodeValue = resStatusCode + 1;
        obj['resStatusCode'] = fieldNamesValues[resStatusCodeValue];

        const clientError = fieldNamesValues.indexOf('clientError'); 
        const clientErrorValue = clientError + 1;
        obj['clientError'] = fieldNamesValues[clientErrorValue];

        const serverError = fieldNamesValues.indexOf('serverError'); 
        const serverErrorValue = serverError + 1;
        obj['serverError'] = fieldNamesValues[serverErrorValue];

        const noError = fieldNamesValues.indexOf('noError'); 
        const noErrorValue = noError + 1;
        obj['noError'] = fieldNamesValues[noErrorValue];

        const resMessage = fieldNamesValues.indexOf('resMessage'); 
        const resMessageValue = resMessage + 1;
        obj['resMessage'] = fieldNamesValues[resMessageValue];

        const cycleDuration = fieldNamesValues.indexOf('cycleDuration'); 
        const cycleDurationValue = cycleDuration + 1;
        obj['cycleDuration'] = fieldNamesValues[cycleDurationValue];

        newResult.push(obj); 
      }

      return newResult; 
    }

    return result; 
  });

  streamEntries = await redis.xrange(STREAM_KEY, startTime, endTime); 

  console.log('XRANGE, response with reply transformer'); 
  // console.log(streamEntries); 

  return streamEntries; 

}

exports.readRedisStream = readRedisStream; 

// try {
//   setInterval(async () => { await readRedisStream()}, PING_RATE); 
// } catch (e) {
//   console.error(e); 
// }