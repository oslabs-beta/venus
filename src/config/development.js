module.exports = {
  venus: {
    /**
       * OPTIONAL: add any endpoints below with the value 'true' to EXCLUDE from the analysis
       */
      endpointsExcluded: {
        'localhost': true,
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