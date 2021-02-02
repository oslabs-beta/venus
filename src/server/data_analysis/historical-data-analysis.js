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
  user: 'postgres', 
  host: 'rds-proxy-aurora-postgres.proxy-czysdiigcqcb.us-east-2.rds.amazonaws.com', 
  database: 'postgres', 
  password: 'lalalalovesong!', 
  // port: process.env.DB_PORT
  port: config.get('DB_PORT')
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

//writeToDB takes in a buffer of 3 min "real-time" objects and writes them to the 3-min table
const writeToDB = (buffer) => {

  let queryText = `INSERT INTO ${THREE_MIN_TABLE} (timestamp, service, method, availability, response_time, error_rate, load) VALUES `; 

  buffer.forEach((threeMinObj) => {

    const timeStamp = unixStringToNumber(threeMinObj.timestamp); 
    
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

//Write a function that reads and analyzes the last hour of 3 minute rows and writes it to the 1 hour table
const writeOneHourIncrements = () => {

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

//Write a function that reads and analyzes the last eight hours of 1 hour rows and writes it to the 8 hour table
const writeEightHourIncrements = () => {
  
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

//Write a function that reads and analyzes the last day of 8 hour rows and writes it to the one day table
const writeOneDayIncrements = () => {

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

//Reading rows from the last hour for consumption on the front-end
const readLastHour = (input) => {
  //Query for ALL rows in the last hour 
  
  let queryText = ''; 

  const returnObj = {}; 

  if(input !== 'aggregate'){
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - HOUR}::BIGINT AND service = '${input}' AND method != 'aggregate' GROUP BY service, method;`;

    returnObj.service = input; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastHour'] = {};
        returnObj['lastHour']['availability'] = [];
        returnObj['lastHour']['error_rate'] = [];
        returnObj['lastHour']['response_time'] = [];
        returnObj['lastHour']['load'] = [];

        rows.forEach((row) => {
          if(row.service === input){

            //Create availability property and push to array
            returnObj['lastHour']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "method": row.method
            })

            returnObj['lastHour']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "method": row.method
            })

            returnObj['lastHour']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "method": row.method
            })

            returnObj['lastHour']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "method": row.method
            })
          }
        })
        
        console.log(returnObj.lastHour); 

        return returnObj.lastHour; 
      }
    })

  } else {
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${THREE_MIN_TABLE} WHERE timestamp >= ${Date.now() - HOUR}::BIGINT AND method = 'aggregate' GROUP BY service, method;`;

    returnObj.service = 'aggregate'; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastHour'] = {};
        returnObj['lastHour']['availability'] = [];
        returnObj['lastHour']['error_rate'] = [];
        returnObj['lastHour']['response_time'] = [];
        returnObj['lastHour']['load'] = [];

        rows.forEach((row) => {
          // if(row.service !== input){

            //Create availability property and push to array
            returnObj['lastHour']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "service": row.service
            })

            returnObj['lastHour']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "service": row.service
            })

            returnObj['lastHour']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "service": row.service
            })

            returnObj['lastHour']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "service": row.service
            })
          // }
        })
        
        console.log(returnObj.lastHour); 

        return returnObj.lastHour; 
      }
    })
  }
}

//Reading rows from the last day for consumption on the front-end
const readLastDay = (input) => {
  //Query for ALL rows in the last hour 
  
  let queryText = ''; 

  const returnObj = {}; 

  if(input !== 'aggregate'){
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_HR_TABLE} WHERE timestamp >= ${Date.now() - DAY}::BIGINT AND service = '${input}' AND method != 'aggregate' GROUP BY service, method;`;

    returnObj.service = input; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastDay'] = {};
        returnObj['lastDay']['availability'] = [];
        returnObj['lastDay']['error_rate'] = [];
        returnObj['lastDay']['response_time'] = [];
        returnObj['lastDay']['load'] = [];

        rows.forEach((row) => {
          if(row.service === input){

            //Create availability property and push to array
            returnObj['lastDay']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "method": row.method
            })

            returnObj['lastDay']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "method": row.method
            })

            returnObj['lastDay']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "method": row.method
            })

            returnObj['lastDay']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "method": row.method
            })
          }
        })
        
        console.log(returnObj.lastDay); 

        return returnObj.lastDay; 
      }
    })

  } else {
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_HR_TABLE} WHERE timestamp >= ${Date.now() - DAY}::BIGINT AND method = 'aggregate' GROUP BY service, method;`;

    returnObj.service = 'aggregate'; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastDay'] = {};
        returnObj['lastDay']['availability'] = [];
        returnObj['lastDay']['error_rate'] = [];
        returnObj['lastDay']['response_time'] = [];
        returnObj['lastDay']['load'] = [];

        rows.forEach((row) => {
          // if(row.service !== input){

            //Create availability property and push to array
            returnObj['lastDay']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "service": row.service
            })

            returnObj['lastDay']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "service": row.service
            })

            returnObj['lastDay']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "service": row.service
            })

            returnObj['lastDay']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "service": row.service
            })
          // }
        })
        
        console.log(returnObj.lastDay); 

        return returnObj.lastDay; 
      }
    })
  }
}

//Reading rows from the last week for consumption on the front-end
const readLastWeek = (input) => {
  //Query for ALL rows in the last hour 
  
  let queryText = ''; 

  const returnObj = {}; 

  if(input !== 'aggregate'){
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HR_TABLE} WHERE timestamp >= ${Date.now() - WEEK}::BIGINT AND service = '${input}' AND method != 'aggregate' GROUP BY service, method;`;

    returnObj.service = input; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastWeek'] = {};
        returnObj['lastWeek']['availability'] = [];
        returnObj['lastWeek']['error_rate'] = [];
        returnObj['lastWeek']['response_time'] = [];
        returnObj['lastWeek']['load'] = [];

        rows.forEach((row) => {
          if(row.service === input){

            //Create availability property and push to array
            returnObj['lastWeek']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "method": row.method
            })

            returnObj['lastWeek']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "method": row.method
            })

            returnObj['lastWeek']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "method": row.method
            })

            returnObj['lastWeek']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "method": row.method
            })
          }
        })
        
        console.log(returnObj.lastWeek); 

        return returnObj.lastWeek; 
      }
    })

  } else {
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HR_TABLE} WHERE timestamp >= ${Date.now() - WEEK}::BIGINT AND method = 'aggregate' GROUP BY service, method;`;

    returnObj.service = 'aggregate'; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastWeek'] = {};
        returnObj['lastWeek']['availability'] = [];
        returnObj['lastWeek']['error_rate'] = [];
        returnObj['lastWeek']['response_time'] = [];
        returnObj['lastWeek']['load'] = [];

        rows.forEach((row) => {
          // if(row.service !== input){

            //Create availability property and push to array
            returnObj['lastWeek']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "service": row.service
            })

            returnObj['lastWeek']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "service": row.service
            })

            returnObj['lastWeek']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "service": row.service,
              "value": row.response_time, 
            })

            returnObj['lastWeek']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "service": row.service
            })
          // }
        })
        
        console.log(returnObj.lastWeek); 

        return returnObj.lastWeek; 
      }
    })
  }
}

//Reading rows from the last month for consumption on the front-end
const readLastMonth = (input) => {
  //Query for ALL rows in the last hour 
  
  let queryText = ''; 

  const returnObj = {}; 

  if(input !== 'aggregate'){
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${ONE_DAY_TABLE} WHERE timestamp >= ${Date.now() - MONTH}::BIGINT AND service = '${input}' AND method != 'aggregate' GROUP BY service, method;`;

    returnObj.service = input; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastMonth'] = {};
        returnObj['lastMonth']['availability'] = [];
        returnObj['lastMonth']['error_rate'] = [];
        returnObj['lastMonth']['response_time'] = [];
        returnObj['lastMonth']['load'] = [];

        rows.forEach((row) => {
          if(row.service === input){

            //Create availability property and push to array
            returnObj['lastMonth']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "method": row.method
            })

            returnObj['lastMonth']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "method": row.method
            })

            returnObj['lastMonth']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "method": row.method
            })

            returnObj['lastMonth']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "method": row.method
            })
          }
        })
        
        console.log(returnObj.lastMonth); 

        return returnObj.lastMonth; 
      }
    })

  } else {
    queryText = `SELECT MAX(timestamp) as timestamp, service, method, AVG(availability::int::float4) as availability, AVG(response_time::int::float4) as response_time, AVG(error_rate::int::float4) as error_rate, AVG(load::int::float4) as load FROM ${EIGHT_HR_TABLE} WHERE timestamp >= ${Date.now() - MONTH}::BIGINT AND method = 'aggregate' GROUP BY service, method;`;

    returnObj.service = 'aggregate'; 
    
    client.query(queryText, (err, result) => {
      if(err){
        console.log(err); 
      } else {
        
        const rows = result.rows; 

        returnObj['lastMonth'] = {};
        returnObj['lastMonth']['availability'] = [];
        returnObj['lastMonth']['error_rate'] = [];
        returnObj['lastMonth']['response_time'] = [];
        returnObj['lastMonth']['load'] = [];

        rows.forEach((row) => {
          // if(row.service !== input){

            //Create availability property and push to array
            returnObj['lastMonth']['availability'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.availability, 
              "service": row.service
            })

            returnObj['lastMonth']['error_rate'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.error_rate, 
              "service": row.service
            })

            returnObj['lastMonth']['response_time'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.response_time, 
              "service": row.service
            })

            returnObj['lastMonth']['load'].push({
              "timestamp": unixToTimestamp(row.timestamp), 
              "value": row.load, 
              "service": row.service
            })
          // }
        })
        
        console.log(returnObj.lastMonth); 

        return returnObj.lastMonth; 
      }
    })
  }
}

//Function to convert unix time into a number
const unixStringToNumber = (unixString) => {

  let unix = unixString.slice(0, unixString.length - 2);
  
  unix = new Number(unix); 
  
  return unix; 
}

//Function to convert unix time into a timestamp consumable by the front-end
const unixToTimestamp = (unixString) => {

  const unix = new Number(unixString); 

  let date = new Date(unix); 

  date = JSON.stringify(date); 

  date = date.slice(1, date.length - 6); 

  return date; 

}

//Historical read object constructor function
const constructHistorical = async (input) => {
  
  const obj = {};
  
  obj['service'] = input; 

  obj['lastHour'] = await readLastHour(input); 
  obj['lastDay'] = await readLastDay(input); 
  obj['lastWeek'] = await readLastWeek(input); 
  obj['lastMonth'] = await readLastMonth(input); 
  return obj; 
}

/*
  Main function initiaties all of the set timeouts necessary to begin the cascading write process. 
  Note that this operates on a separate cadence than the function that initially writes to the 3 min table (that function is triggered manually in the index.js file whenever the buffer becomes full).
*/
const main = () => {

  setTimeout(() => {
    writeOneHourIncrements(); 
  }, HOUR)

  setTimeout(() => {
    writeEightHourIncrements(); 
  }, EIGHT_HOURS)

  setTimeout(() => {
    writeOneDayIncrements(); 
  }, DAY)

}

// histWriteToDB(test); 
// readAndWriteLastHour(); 
// const testService = 'curriculum-api.codesmith.io'
// readLastHour(testService); 

module.exports = {constructHistorical, main, writeToDB}; 