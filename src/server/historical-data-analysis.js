const dfd = require('danfojs-node');
const { Client, Pool } = require('pg');
require('dotenv').config(); 

//Specify table names
const THREE_MIN_TABLE = 'three_min_table';
const ONE_HR_TABLE = 'one_hour_table';
const EIGHT_HR_TABLE = 'eight_hour_table'
const TWENTY_FOUR_HR_TABLE = 'twenty_four_hour_table';
const HOUR = 3600000
const EIGHT_HOURS = 28800000 


//Boilerplate to set up postgres db (client) object
const client = new Client({
  user: process.env.DB_NAME, 
  host: process.env.DB_PROXY, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  port: process.env.DB_PORT
})

client.connect();

//histWriteToDB takes in a buffer of 3 min "real-time" objects and writes them to the 3-min data base
const histWriteToDB = (buffer) => {
  
  let queryText = `INSERT INTO ${THREE_MIN_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES `; 
  
  //Write the overall aggregate statistics for the 3 minute interval
  queryText += `('${buffer.timestamp}', 'aggregate', 'aggregate', '${buffer.aggregate.availability}', '${buffer.aggregate.response_time}', '${buffer.aggregate.error}', '${buffer.aggregate.load}'),`;

  //Fill in all the aggregate rows by method
  for(let method in buffer.byMethod){
    queryText += `('${buffer.timestamp}', 'aggregate', '${method}', '${buffer.aggregate.byMethod.method.availability}', '${buffer.aggregate.byMethod.method.response_time}', '${buffer.aggregate.byMethod.method.error}', '${buffer.aggregate.byMethod.method.load}'),`;
  }
  
  //Fill in all the rows for aggregate at the service level and then by the method level
  buffer.services.forEach((service) => {
    //Add aggregate service level metrics
    queryText += `('${buffer.timestamp}', '${service}', 'aggregate', '${service.availability}', '${service.response_time}', '${service.error}', '${service.load}'),`;

    //Add service level metrics by method
    for(let method in service.byMethod){
      queryText += `('${buffer.timestamp}', '${service}', '${method}', '${service.method.availability}', '${service.method.response_time}', '${service.method.error}', '${service.method.load}'),`;
    }
  })

  //Modify the last comma and replace with a semi-colon
  queryText = queryText.slice(0, queryText.length - 1); 
  queryText += ';'; 


  client.query(queryText, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      console.log(`Finished writing to ${DB_NAME}...`, result); 
    }
  })
}

//Write a function that reads and analyzes the last hour of 3 minute rows
const readAndWriteLastHour = () => {
  //Query the three minute table for the last hour of data only at the aggregate level (not service level)
  const selectAggregate = `SELECT * FROM ${THREE_MIN_TABLE} WHERE service = aggregate AND timestamp >= ${Date.now() - HOUR}`;
  //Analyze by aggregate, service and method
} 

//Write a function that reads and analyzes the last day of 1 hour rows
const readAndWriteLastDay = () => {
  
} 

//Write a function that reads and analyzes the last week of 8 hour rows
const readAndWriteLastWeek = () => {
  
} 

//Write a function that reads and analyzes the last month of 1 day rows
const readAndWriteLastMonth = () => {
  
} 