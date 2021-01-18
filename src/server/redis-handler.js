const Redis = require('ioredis'); 
const cluster = new Redis.Cluster([{
  port: 6379, 
  host: 'venus-redis-cluster-2.syohjt.clustercfg.use2.cache.amazonaws.com'
}]);


