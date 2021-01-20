const { read } = require('fs');
const Redis = require('ioredis');
const { Client } = require('pg'); 

//Name of stream we are reading from
const STREAM_KEY = 'logstream'
//Interval of the stream we are processing to write to the database
const INTERVAL = 3000;
//Rate at which we want to query the stream for data
const PING_RATE = 3000; 
//Where Redis is being hosted (either local machine or elasticache)
const REDIS_HOST = 'venus-redis-micro.syohjt.ng.0001.use2.cache.amazonaws.com'
// const REDIS_HOST = 'localhost'

const DB_NAME = 'postgres'; 

const TABLE_NAME = 'logs'

const REGION = 'us-east-2'

const redis = new Redis({
  port: 6379, 
  host: REDIS_HOST
});

// const docClient = new dynamodb.DocumentClient({region: REGION}); 

const client = new Client({
  user: DB_NAME, 
  host: 'log-database-1.cluster-czysdiigcqcb.us-east-2.rds.amazonaws.com', 
  database: DB_NAME, 
  password: 'NMnNA2IXwfuyJcyPyBen', 
  port: 5432
})

client.connect(); 

//Get the milliseconds for start and end time
let mostRecentTimeStamp = '0-0'

console.log(`Reading the stream named ${STREAM_KEY}...`); 

const readAndWriteToDB = async () => {

  //Get the milliseconds for start and end time
  const startTime = Date.now() - INTERVAL; 
  const endTime = startTime + INTERVAL;  

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

  //QUERY STREAM

  streamEntries = await redis.xrange(STREAM_KEY, startTime, endTime);

  console.log('XRANGE, response with reply transformer'); 
  // //real-time entries should be sent for processing elsewhere 
  console.log(streamEntries); 

  //WRITE TO THE DATABASE

  let queryText = `INSERT INTO ${TABLE_NAME} (redis_timestamp, req_method, req_host, req_path, req_url, res_status_code, res_message, cycle_duration) VALUES `; 

  if(streamEntries.length !== 0){

    console.log(`Writing to table ${DB_NAME}...`); 

    streamEntries.forEach( (log) => {
      // console.log('log: ', log); 
      queryText += `('${log.id}', '${log.reqMethod}', '${log.reqHost}', '${log.reqPath}', '${log.reqURL}', '${log.resStatusCode}', '${log.resMessage}', '${log.cycleDuration}'),`; 
    })
  
    //Modify the last comma and replace with a semi-colon
    queryText = queryText.slice(0, queryText.length - 1); 
    queryText += ';'; 
  
    //Write to the database
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        console.log(`Finished writing to ${DB_NAME}...`, result); 
      }
    })
  }
}

try {
  setInterval(async () => { await readAndWriteToDB() }, PING_RATE); 
} catch (e) {
  console.error(e); 
}