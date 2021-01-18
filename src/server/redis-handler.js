const Redis = require('ioredis'); 
const cluster = new Redis.Cluster([{
  port: 6379, 
  host: 'venus-redis-cluster-2.syohjt.clustercfg.use2.cache.amazonaws.com'
}]);

const STREAM_KEY = 'logstream'

console.log(`Reading the stream named ${STREAM_KEY}...`); 

const readRedisStream = async () => {

  let streamEntries = await cluster.xrange(STREAM_KEY, '-', '+', 'COUNT', 4); 

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

  streamEntries = await cluster.xrange(STREAM_KEY, '-', '+', 'COUNT', 4); 

  console.log('XRANGE, response with reply transformer'); 
  console.log(streamEntries); 

}

try {
  readRedisStream(); 
} catch (e) {
  console.error(e); 
}