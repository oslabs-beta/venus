module.exports = {
  venus: {
      /**
       * OPTIONAL: add any endpoints below with the value 'true' to EXCLUDE from the analysis
       */
    endpointsExcluded: {
      'https://curriculum-api.codesmith.io/messages': true,
    },
  },
  redisConnect: {
    port: 6379,
    host: '127.0.0.1',
    enableAutoPipelining: true,
  },
  redisStream: {
    REDIS_STREAM_NAME: 'venus',
  },
};

