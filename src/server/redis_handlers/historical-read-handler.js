const { read } = require('fs');
const Redis = require('ioredis');
const { Client, Pool } = require('pg');
require('dotenv').config(); 
const pool = require('./db.js');

//Name of stream we are reading from
// const STREAM_KEY = process.env.STREAM_KEY; 
const STREAM_KEY = process.env.STREAM_KEY; 
//Interval of the stream we are processing to write to the database
const INTERVAL = process.env.INTERVAL;
//Rate at which we want to query the stream for data
const PING_RATE = process.env.PING_RATE; 
//DB table name you set up in config
const TABLE_NAME = process.env.TABLE_NAME; 

const DB_NAME = process.env.DB_NAME; 

//Boilerplate to set up redis object
const redis = new Redis({
  port: process.env.REDIS_PORT, 
  host: process.env.REDIS_HOST
});

//Boilerplate to set up postgres db (client) object
const client = new Client({
  user: process.env.DB_NAME, 
  host: process.env.DB_PROXY, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  port: process.env.DB_PORT
})

// client.connect(); 

//TEST READ TABLE FROM POSTGRES
  pool.query('SELECT * FROM logs; ')
    .then((result) => {
      console.log(`Read from table ${TABLE_NAME}...`, result);
    })
    .catch((err) => console.log(err))

  console.log(`Reading the stream named ${STREAM_KEY}...`); 

  export const readAndWriteToDB = async () => {

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

    //Get the milliseconds for start and end time
    const startTime = Date.now() - INTERVAL; 
    const endTime = startTime + INTERVAL; 

    //QUERY STREAM
    streamEntries = await redis.xrange(STREAM_KEY, startTime, endTime);

    // //real-time entries should be sent for processing elsewhere 
    console.log('XRANGE, response with reply transformer'); 
    console.log(streamEntries); 

    //WRITE TO THE DATABASE
    let queryText = `INSERT INTO ${TABLE_NAME} (redis_timestamp, req_method, req_host, req_path, req_url, res_status_code, res_message, cycle_duration) VALUES `; 

    if(streamEntries.length !== 0){

      console.log(`Writing to table ${DB_NAME}...`); 

      //Construct the query for all the new entries to the SQL table
      //TODO: Consider using the built-in params feature or sequelize / other ORMs
      streamEntries.forEach((log) => {
        queryText += `('${log.id}', '${log.reqMethod}', '${log.reqHost}', '${log.reqPath}', '${log.reqURL}', '${log.resStatusCode}', '${log.resMessage}', '${log.cycleDuration}'),`; 
      })
    
      //Modify the last comma and replace with a semi-colon
      queryText = queryText.slice(0, queryText.length - 1); 
      queryText += ';'; 
    
      //Write the actual query to the database
      pool.query(queryText,(err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Finished writing to ${DB_NAME}...`, result); 
        }
      })
    }


  }

  try {
    setInterval( async () => { await readAndWriteToDB() }, PING_RATE); 
  } catch (e) {
    console.error(e); 
  }


