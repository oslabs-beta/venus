module.exports = {
  venus: {
    // endpoints_exclude object will contain all UNTRACKED API dependency endpoints 
    // boolean value pair allows for easy on/off tracking switch  
    
    // req / res properties 
      // necessary: ALL_CAPS
      // optional: set to false by default
    endpoints: {
      'https://curriculum-api.codesmith.io/messages': false,
    },
  },
  STREAM_KEY : 'logstream',
  INTERVAL : 3000,
  PING_RATE : 3000,
  RT_INTERVAL : 180000,
  RT_PING_RATE : 3000,
  REDIS_HOST : 'venus-redis-micro.syohjt.ng.0001.use2.cache.amazonaws.com',
  REDIS_PORT : 6379,
  DB_PASS : 'lalalalovesong!',
  DB_NAME : 'postgres',
  TABLE_NAME : 'logs',
  AWS_REGION : 'us-east-2',
  DB_HOST : 'database-1.cluster-czysdiigcqcb.us-east-2.rds.amazonaws.com',
  DB_PROXY : 'rds-proxy-aurora-postgres.proxy-czysdiigcqcb.us-east-2.rds.amazonaws.com',
  DB_PORT : 5432,
  EC2_HOST : 'ec2-3-15-29-241.us-east-2.compute.amazonaws.com',
  redisConnect: {
    port: 6379,
    host: 'venus-redis-micro.syohjt.ng.0001.use2.cache.amazonaws.com',
    dnsLookup: (address, callback) => callback(null, address),
  },
  redisStream: {
    REDIS_STREAM_NAME: 'venus',
  },
}