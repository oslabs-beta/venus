const { read } = require('fs');
const Redis = require('ioredis'); 
const redis = new Redis({
  port: 6379, 
  host: 'localhost'
});

const STREAM_KEY = 'logstream'

console.log(`Reading the stream named ${STREAM_KEY}...`); 

const readRedisStream = async () => {

  const startTime = Date.now() - 300000; 
  const endTime = startTime + 300000; 

  let streamEntries = await redis.xrange(STREAM_KEY, startTime, endTime); 

  console.log('XRANGE, standard response:'); 
  console.log(streamEntries); 

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

}

try {
  setInterval(async () => { await readRedisStream()}, 3000); 
} catch (e) {
  console.error(e); 
}