const { read } = require('fs');
const Redis = require('ioredis');
const dynamodb = require('aws-sdk/clients/dynamodb');  
const { Client } = require('pg'); 

//Name of stream we are reading from
const STREAM_KEY = 'venus'
//Interval of the stream we are processing to write to the database
const INTERVAL = 3000;
//Rate at which we want to query the stream for data
const PING_RATE = 3000; 
//Where Redis is being hosted (either local machine or elasticache)
const REDIS_HOST = 'venus-redis-micro.syohjt.ng.0001.use2.cache.amazonaws.com'

const TABLE_NAME = 'log_data_second'; 

const REGION = 'us-east-2'

const redis = new Redis({
  port: 6379, 
  host: REDIS_HOST
});

// const docClient = new dynamodb.DocumentClient({region: REGION}); 

const client = new Client({
  user: 'postgres', 
  host: 'log-database-1.cluster-czysdiigcqcb.us-east-2.rds.amazonaws.com', 
  database: 'log-database-1', 
  password: 'NMnNA2IXwfuyJcyPyBen', 
  port: 5432
})

await client.connect(); 


console.log(`Reading the stream named ${STREAM_KEY}...`); 

const readAndWriteToDB = async () => {

  //Get the milliseconds for start and end time
  const startTime = Date.now() - INTERVAL; 
  const endTime = startTime + INTERVAL; 

  //Transform xrange's output from two arrays of keys and value into one array of log objects
  Redis.Command.setReplyTransformer('xread', function (result) {
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

  streamEntries = await redis.xread(STREAM_KEY, startTime, endTime); 

  console.log('XRANGE, response with reply transformer'); 
  //real-time entries should be sent for processing elsewhere 
  console.log(streamEntries); 

  console.log(`Writing to table ${TABLE_NAME}...`); 

  streamEntries.forEach( async (log) => {

    const params = {
      TableName: TABLE_NAME, 
      Item: log
    }

    await docClient.put(params).promise(); 
  })

  console.log(`Finished writing to ${TABLE_NAME}...`); 

}

try {
  setInterval(async () => { await readAndWriteToDB()}, PING_RATE); 
} catch (e) {
  console.error(e); 
}