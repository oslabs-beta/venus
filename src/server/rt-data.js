/* eslint-disable dot-notation */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const dfd = require('danfojs-node');
const { rtDataByCategory, rowToObj, aggregateStatsToObj } = require('./rt-data-helperFunctions');

const responseData = [
  {
    id: '1611550512393-1',
    reqHost: 'curriculum-api.codesmith.io',
    reqMethod: 'GET',
    reqPath: '/messages',
    reqUrl: 'https://curriculum-api.codesmith.io/messagez',
    resStatusCode: '403',
    clientError: '1',
    serverError: '0',
    noError: '0',
    resMessage: 'Forbidden',
    cycleDuration: '1232',
  },
  {
    id: '1144550577793-1',
    reqHost: 'curriculum-api.codesmith.io',
    reqMethod: 'POST',
    reqPath: '/messages',
    reqUrl: 'https://curriculum-api.codesmith.io/messages',
    resStatusCode: '400',
    clientError: '1',
    serverError: '0',
    noError: '0',
    resMessage: 'Bad request',
    cycleDuration: '1300',
  },
  {
    id: '1611550577793-1',
    reqHost: 'curriculum-api.codesmith.io',
    reqMethod: 'GET',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1105.248547',
  },
  {
    id: '1611550514493-1',
    reqHost: 'finance.yahoo.com',
    reqMethod: 'GET',
    reqPath: '/TSLA',
    reqUrl: 'https://finance.yahoo.com/TSLA',
    resStatusCode: '500',
    clientError: '0',
    serverError: '1',
    noError: '0',
    resMessage: 'Internal server error',
    cycleDuration: 'NaN',
  },
  {
    id: '1611550514593-1',
    reqHost: 'finance.yahoo.com',
    reqMethod: 'DELETE',
    reqPath: '/AAPL',
    reqUrl: 'https://finance.yahoo.com/AAPL',
    resStatusCode: '400',
    clientError: '1',
    serverError: '0',
    noError: '0',
    resMessage: 'Bad request',
    cycleDuration: '1335',
  },
  {
    id: '1611550577793-1',
    reqHost: 'finance.yahoo.com',
    reqMethod: 'PUT',
    reqPath: '/TSLA/',
    reqUrl: 'https://finance.yahoo.com/TSLA/',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1105.248547',
  },
  {
    id: '1611550514593-1',
    reqHost: 'weather.google.com',
    reqMethod: 'GET',
    reqPath: '/California/LA',
    reqUrl: 'https://weather.google.com/california/la',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1200',
  },
  {
    id: '1611550598793-1',
    reqHost: 'weather.google.com',
    reqMethod: 'PATCH',
    reqPath: '/California/SF',
    reqUrl: 'https://weather.google.com/california/sf',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1100',
  },
  
  {
    id: '1611550577793-1',
    reqHost: 'weather.google.com',
    reqMethod: 'POST',
    reqPath: '/venice/',
    reqUrl: 'https://weather.google.com/california/venice/',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1105.248547',
  },
  
];

/**
 * @param {array} data -> array of log objects
 * @returns single nested object with two properties: 'services' and 'aggregate'
  * Value of 'services' property is an array of objects. Each object includes consolidated metrics by service, as well as a byMethod property. 
    * Value of 'byMethod' property is a nested object, where each key represents a request method (GET / POST / PUT / DELETE / PATCH), 
    * and the value is an object with consolidated metrics at that request level
  * Value of 'aggregate' property is an object with aggregate stats for the entire data set, as well as a byMethod property,
  * with an identical structure to one mentioned above.
  */ 

const rtData = (data) => {
  const consolidatedObj = {};

  /**
   * convert array of objects to data frame and cast the numeric variables (currently in string format) to integers
   */
  const df = new dfd.DataFrame(data);
  df['cycleDuration'] = df['cycleDuration'].astype('int32');
  df['resStatusCode'] = df['resStatusCode'].astype('int32');
  df['clientError'] = df['clientError'].astype('int32');
  df['serverError'] = df['serverError'].astype('int32');
  df['noError'] = df['noError'].astype('int32');


  
  const outputTable = rtDataByCategory(df, 'reqHost');
  
  /**
   * Each row in the outputTable includes consolidated metrics by service.
   * Iterate through each row and construct the service-level object to be pushed to the array ('services' key: value)
   */
  consolidatedObj.services = [];
  outputTable.data.forEach((row) => {
    const service = row[0];
    const outputObj = rowToObj(row, service);
    consolidatedObj.services.push(outputObj);
  });

  /**
   * Invoke similar function to the above to construct the aggregate object ('aggregate' key: value)
   */
  consolidatedObj.aggregate = aggregateStatsToObj(df);

  /** array of host values */
  const uniqueHosts = df.reqHost.unique().data;

  /* iterate through each host (aka service) value in order to fill in service-level data */
  uniqueHosts.forEach((host, hostIndex) => {
    const dfHost = df.query({ column: 'reqHost', is: '==', to: host });
    const outputTableByMethod = rtDataByCategory(dfHost, 'reqMethod');
    consolidatedObj.services[hostIndex].byMethod = {};
    
    /* iterate through each request method in order to fill in method-level data */
    outputTableByMethod.data.forEach((row) => {
      const method = row[0];
      consolidatedObj.services[hostIndex].byMethod[method] = rowToObj(row);
    });
  });
  // FIXME delete console.log before shipping
  console.log(consolidatedObj);
  console.log(consolidatedObj.services[1]);
  return JSON.stringify(consolidatedObj);
};

// FIXME uncomment below before shipping
// module.exports = rtData;

rtData(responseData);