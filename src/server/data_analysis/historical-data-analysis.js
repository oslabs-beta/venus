const dfd = require('danfojs-node');
const { Client, Pool } = require('pg');
require('dotenv').config();

//Specify table names
const THREE_MIN_TABLE = 'three_min_table';
const ONE_HR_TABLE = 'one_hr_table';
const EIGHT_HR_TABLE = 'eight_hr_table'
const ONE_DAY_TABLE = 'one_day_table';
const HOUR = 3600000; 
const EIGHT_HOURS = 28800000;  
const DAY = 86400000; 
const WEEK = 604800000; 


//Boilerplate to set up postgres db (client) object
const client = new Client({
  user: process.env.DB_NAME, 
  host: process.env.DB_PROXY, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  port: process.env.DB_PORT
})

client.connect();


const test = [
  {
     timestamp: '1612165090715-0',
      services: [
        {
          service: 'curriculum-api.codesmith.io',
          load: 15,
          response_time: 1198,
          error: 56,
          availability: 100,
          byMethod: {
            GET: {
            load: 20, 
            response_time: 1292, 
            availability: 299, 
            error: 12
            }, 
            PUT: {
              load: 20, 
              response_time: 1292, 
              availability: 299, 
              error: 34
            }, 
            POST: {
              load: 20, 
              response_time: 1292, 
              availability: 299, 
              error: 32
            } 
        },
      }
    ], 
    aggregate: {
      error: 56,
      load: 15,
      response_time: 500,
      availability: 50,
      byMethod: { 
        GET: {
          load: 20, 
          response_time: 1292, 
          availability: 299, 
          error: 39
        } 
      }
    }
  },
  {
    timestamp: '1612165090650-0',
      services: [
        {
          service: 'google-weather-api',
          load: 15,
          response_time: 1198,
          error: 56,
          availability: 100,
          byMethod: {
            GET: {
            load: 20, 
            response_time: 1292, 
            availability: 299, 
            error: 32
            }, 
            PUT: {
              load: 20, 
              response_time: 1292, 
              availability: 299, 
              error: 12
            }, 
            POST: {
              load: 20, 
              response_time: 1292, 
              availability: 299, 
              error: 53
            } 
        },
      }
    ], 
    aggregate: {
      error: 56,
      load: 15,
      response_time: 1000,
      availability: 100,
      byMethod: { 
        GET: {
          load: 20, 
          response_time: 1292, 
          availability: 299, 
          error: 65
        } 
      }
    }
  } 
]


//histWriteToDB takes in a buffer of 3 min "real-time" objects and writes them to the 3-min data base
const histWriteToDB = (buffer) => {

  let queryText = `INSERT INTO ${THREE_MIN_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES `; 

  buffer.forEach((threeMinObj) => {

    const timeStamp = convertUnixTime(threeMinObj.timestamp); 
    
    //Write the overall aggregate statistics for the 3 minute interval
    queryText += `('${timeStamp}', 'aggregate', 'aggregate', '${threeMinObj.aggregate.availability}', '${threeMinObj.aggregate.response_time}', '${threeMinObj.aggregate.error}', '${threeMinObj.aggregate.load}'),`;

    //Fill in all the aggregate rows by method
    for(let method in threeMinObj.aggregate.byMethod){
      queryText += `('${timeStamp}', 'aggregate', '${method}', '${threeMinObj.aggregate.byMethod[method].availability}', '${threeMinObj.aggregate.byMethod[method].response_time}', '${threeMinObj.aggregate.byMethod[method].error}', '${threeMinObj.aggregate.byMethod[method].load}'),`;
    }
    
    //Fill in all the rows for aggregate at the service level and then by the method level
    threeMinObj.services.forEach((service) => {
      //Add aggregate service level metrics
      queryText += `('${timeStamp}', '${service.service}', 'aggregate', '${service.availability}', '${service.response_time}', '${service.error}', '${service.load}'),`;

      //Add service level metrics by method
      for(let method in service.byMethod){
        queryText += `('${timeStamp}', '${service.service}', '${method}', '${service.byMethod[method].availability}', '${service.byMethod[method].response_time}', '${service.byMethod[method].error}', '${service.byMethod[method].load}'),`;
      }
    })
  })
  
  //Modify the last comma and replace with a semi-colon
  queryText = queryText.slice(0, queryText.length - 1); 
  queryText += ';'; 


  client.query(queryText, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      console.log(`Finished writing to ${THREE_MIN_TABLE}...`, result); 
    }
  })
}

//Function to convert unix time into a human readable timestamp
const convertUnixTime = (unixString) => {

  let unix = unixString.slice(0, unixString.length - 2);
  
  unix = new Number(unix); 
  
  return unix; 
}

//Write a function that reads and analyzes the last hour of 3 minute rows
const writeThreeMinIncrements = () => {

  //Query for overall average
  const selectOverallAggregate = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - HOUR}::BIGINT AND service = 'aggregate' AND method = 'aggregate' GROUP BY service, method;`;
  
  //Query for overall averages by method
  const selectOverallMethod = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - HOUR}::BIGINT AND service = 'aggregate' AND method != 'aggregate' GROUP BY service, method;`;

  //Query for aggregate statistics by service
  const selectServiceAggregate = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - HOUR}::BIGINT AND service != 'aggregate' AND method = 'aggregate' GROUP BY service, method;`;

  //Query for method level statistics by service 
  const selectServiceMethod = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - HOUR}::BIGINT AND service != 'aggregate' AND method != 'aggregate' GROUP BY service, method;`;

  // // Query overall stats and write to the one hour table
  client.query(selectOverallAggregate, (err, result) => {
    if(err){
      console.log(err); 
    } else {

      const avg = result.rows[0];

      let insertOverallAggregate = `INSERT INTO ${ONE_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
      
      insertOverallAggregate += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;

      client.query(insertOverallAggregate, (err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Wrote query...`, result); 
        }
      })
      
    }
  })
  
  // Query overall stats by method and write to the one hour table
  client.query(selectOverallMethod, (err, result) => {
    if(err){
      console.log(err); 
    } else {

      const avg = result.rows[0];
      
      console.log('Result from average in 3 min query:', result.rows); 

      let insertOverallMethod = `INSERT INTO ${ONE_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
      
      insertOverallMethod += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;

      client.query(insertOverallMethod, (err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Wrote query...`, result); 
        }
      })
      
    }
  })

  // // Query service level stats and write to the one hour table
  client.query(selectServiceAggregate, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      
      const avgs = result.rows; 

      avgs.forEach((avg) => {
        
        let insertServiceAggregate = `INSERT INTO ${ONE_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
        
        insertServiceAggregate += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;
  
        client.query(insertServiceAggregate, (err, result) => {
          if(err){
            console.log(err); 
          } else {
            console.log(`Wrote query...`, result); 
          }
        })
      })
    }
  })

  // Query service level stats and write to the one hour table
  client.query(selectServiceMethod, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      
      console.log('Select by service AND method: ', result.rows); 

      const avgs = result.rows; 

      avgs.forEach((avg) => {
        
        let insertServiceMethod = `INSERT INTO ${ONE_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
        
        insertServiceMethod += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;
  
        client.query(insertServiceMethod, (err, result) => {
          if(err){
            console.log(err); 
          } else {
            console.log(`Wrote query...`, result); 
          }
        })
      })
    }
  })


  client.query('SELECT * FROM one_hr_table', (err, result) => {
    if(err){
      console.log(err); 
    } else {
      console.log('One hour table...', result.rows); 
    }
  })

} 

//Reading all rows from the last hour
const readLastHour = (input) => {
  //Query for ALL rows in the last hour 
  
  let queryText = ''; 

  const returnObj = {}; 

  if(input !== 'aggregate'){
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - 100000000000}::BIGINT WHERE service = '${input}' AND method != 'aggregate' GROUP BY service, method;`;
  } else {
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - 100000000000}::BIGINT WHERE AND method = 'aggregate' GROUP BY service, method;`;

    returnObj.service = 'aggregate'; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        rows.forEach((row) => {
          if(row.service === input){

            //Create availability property and push to array
            returnObj.lastHour.availability.push({
              "timestamp": row.timestamp, 
              "value": row.availability, 
              "service": row.service
            })

            returnObj.lastHour.error_rate.push({
              "timestamp": row.timestamp, 
              "value": row.error_rate, 
              "service": row.service
            })

            returnObj.lastHour.response_time.push({
              "timestamp": row.timestamp, 
              "value": row.response_time, 
              "service": row.service
            })

            returnObj.lastHour.load.push({
              "timestamp": row.timestamp, 
              "value": row.load, 
              "service": row.service
            })
          }
        })
        
        console.log(returnObj); 

        return returnObj; 
      }
    })
  }
}

//Write a function that reads and analyzes the last day of 1 hour rows
const writeOneHourIncrements = () => {

  //Query for overall average
  const selectOverallAggregate = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_HR_TABLE} WHERE timestamp >= ${Date.now() - EIGHT_HOURS}::BIGINT AND service = 'aggregate' AND method = 'aggregate' GROUP BY service, method;`;
  
  //Query for overall averages by method
  const selectOverallMethod = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_HR_TABLE} WHERE timestamp >= ${Date.now() - EIGHT_HOURS}::BIGINT AND service = 'aggregate' AND method != 'aggregate' GROUP BY service, method;`;

  //Query for aggregate statistics by service
  const selectServiceAggregate = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_HR_TABLE} WHERE timestamp >= ${Date.now() - EIGHT_HOURS}::BIGINT AND service != 'aggregate' AND method = 'aggregate' GROUP BY service, method;`;

  //Query for method level statistics by service 
  const selectServiceMethod = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_HR_TABLE} WHERE timestamp >= ${Date.now() - EIGHT_HOURS}::BIGINT AND service != 'aggregate' AND method != 'aggregate' GROUP BY service, method;`;

  // // Query overall stats and write to the one hour table
  client.query(selectOverallAggregate, (err, result) => {
    if(err){
      console.log(err); 
    } else {

      const avg = result.rows[0];

      let insertOverallAggregate = `INSERT INTO ${EIGHT_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
      
      insertOverallAggregate += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;

      client.query(insertOverallAggregate, (err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Wrote query...`, result); 
        }
      })
      
    }
  })
  
  // Query overall stats by method and write to the one hour table
  client.query(selectOverallMethod, (err, result) => {
    if(err){
      console.log(err); 
    } else {

      const avg = result.rows[0];
      
      console.log('Result from average in 3 min query:', result.rows); 

      let insertOverallMethod = `INSERT INTO ${EIGHT_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
      
      insertOverallMethod += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;

      client.query(insertOverallMethod, (err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Wrote query...`, result); 
        }
      })
      
    }
  })

  // // Query service level stats and write to the one hour table
  client.query(selectServiceAggregate, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      
      const avgs = result.rows; 

      avgs.forEach((avg) => {
        
        let insertServiceAggregate = `INSERT INTO ${EIGHT_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
        
        insertServiceAggregate += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;
  
        client.query(insertServiceAggregate, (err, result) => {
          if(err){
            console.log(err); 
          } else {
            console.log(`Wrote query...`, result); 
          }
        })
      })
    }
  })

  // Query service level stats and write to the one hour table
  client.query(selectServiceMethod, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      
      console.log('Select by service AND method: ', result.rows); 

      const avgs = result.rows; 

      avgs.forEach((avg) => {
        
        let insertServiceMethod = `INSERT INTO ${EIGHT_HR_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
        
        insertServiceMethod += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;
  
        client.query(insertServiceMethod, (err, result) => {
          if(err){
            console.log(err); 
          } else {
            console.log(`Wrote query...`, result); 
          }
        })
      })
    }
  })

} 

//Write a function that reads and analyzes the last week of 8 hour rows
const writeEightHourIncrements = () => {

  //Query for overall average
  const selectOverallAggregate = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HOUR_TABLE} WHERE timestamp >= ${Date.now() - DAY}::BIGINT AND service = 'aggregate' AND method = 'aggregate' GROUP BY service, method;`;
  
  //Query for overall averages by method
  const selectOverallMethod = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HOUR_TABLE} WHERE timestamp >= ${Date.now() - DAY}::BIGINT AND service = 'aggregate' AND method != 'aggregate' GROUP BY service, method;`;

  //Query for aggregate statistics by service
  const selectServiceAggregate = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HOUR_TABLE} WHERE timestamp >= ${Date.now() - DAY}::BIGINT AND service != 'aggregate' AND method = 'aggregate' GROUP BY service, method;`;

  //Query for method level statistics by service 
  const selectServiceMethod = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HOUR_TABLE} WHERE timestamp >= ${Date.now() - DAY}::BIGINT AND service != 'aggregate' AND method != 'aggregate' GROUP BY service, method;`;

  // // Query overall stats and write to the one hour table
  client.query(selectOverallAggregate, (err, result) => {
    if(err){
      console.log(err); 
    } else {

      const avg = result.rows[0];

      let insertOverallAggregate = `INSERT INTO ${ONE_DAY_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
      
      insertOverallAggregate += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;

      client.query(insertOverallAggregate, (err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Wrote query...`, result); 
        }
      })
      
    }
  })
  
  // Query overall stats by method and write to the one hour table
  client.query(selectOverallMethod, (err, result) => {
    if(err){
      console.log(err); 
    } else {

      const avg = result.rows[0];
      
      console.log('Result from average in 3 min query:', result.rows); 

      let insertOverallMethod = `INSERT INTO ${ONE_DAY_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
      
      insertOverallMethod += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;

      client.query(insertOverallMethod, (err, result) => {
        if(err){
          console.log(err); 
        } else {
          console.log(`Wrote query...`, result); 
        }
      })
      
    }
  })

  // // Query service level stats and write to the one hour table
  client.query(selectServiceAggregate, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      
      const avgs = result.rows; 

      avgs.forEach((avg) => {
        
        let insertServiceAggregate = `INSERT INTO ${ONE_DAY_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
        
        insertServiceAggregate += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;
  
        client.query(insertServiceAggregate, (err, result) => {
          if(err){
            console.log(err); 
          } else {
            console.log(`Wrote query...`, result); 
          }
        })
      })
    }
  })

  // Query service level stats and write to the one hour table
  client.query(selectServiceMethod, (err, result) => {
    if(err){
      console.log(err); 
    } else {
      
      console.log('Select by service AND method: ', result.rows); 

      const avgs = result.rows; 

      avgs.forEach((avg) => {
        
        let insertServiceMethod = `INSERT INTO ${ONE_DAY_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES`;
        
        insertServiceMethod += `('${avg.timestamp}', '${avg.service}', '${avg.method}', '${avg.availability}', '${avg.response_time}', '${avg.error_rate}', '${avg.load}');`;
  
        client.query(insertServiceMethod, (err, result) => {
          if(err){
            console.log(err); 
          } else {
            console.log(`Wrote query...`, result); 
          }
        })
      })
    }
  })
} 

// histWriteToDB(test); 
// readAndWriteLastHour(); 
readLastHour(); 