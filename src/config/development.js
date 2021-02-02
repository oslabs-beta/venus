module.exports = {
  venus: {
    // endpoints object will contain all the relevant API dependency endpoints 
    // boolean value pair allows for easy on/off tracking switch  
    
    // req / res properties 
      // necessary: ALL_CAPS
      // optional: set to false by default
    endpoints: {
      'https://curriculum-api.codesmith.io/messages': true,
    },
  },
  redisConnect: {
    port: 6379,
    // host: '127.0.0.1',
    host: 'venus-redis-micro.syohjt.ng.0001.use2.cache.amazonaws.com',
    dnsLookup: (address, callback) => callback(null, address),
  },
  redisStream: {
    REDIS_STREAM_NAME: 'venus',
  },
};


// host: 'venus-redis-micro.syohjt.ng.0001.use2.cache.amazonaws.com',