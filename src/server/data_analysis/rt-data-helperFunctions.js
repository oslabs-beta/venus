/* eslint-disable no-mixed-operators */
/* eslint-disable dot-notation */
const dfd = require('danfojs-node');

const STREAM_WINDOW = 3;


/**
 * This function will be invoked when analyzing data by service and by method.
 * @param {object (Danfo.js DataFrame)} df -> danfo.js DataFrame object.
 * @param {string} category -> log object property / DataFrame column by which the data will be grouped -
 *  Currently either 'reqHost' or 'reqMethod'.
 * @returns outputTable DataFrame object, with each row including the calculated statistics by
 *  the category passed in.
 */
function rtDataByCategory(df, category) {
  /**
   * Note that the grouped dataFrame is an intermitent data structure, 
   * upon which additional analysis can be conducted.
   */
  
  const dfGroupedByCategory = df.groupby([`${category}`]);
  
  /**
   * new DataFrame, collapsed by category, and with a new column 
   * that represents the 'count' of each 'category'
   */
  const dfNewByCategory = dfGroupedByCategory.col([`${category}`]).count();
  
  /**
   * assign label names to constants for more dynamic column creation
   */
  const categoryLabel = `${category}`; 
  const categoryCountLabel = `${category}_count`; 
  dfNewByCategory.columns[1] = categoryCountLabel;  

  /* Final DataFrame that will include columns with the calculated metrics */  
  let dfFinal;      

  /**
   * Timestamp is calculated as the minimum time stamp within each category. 
   */
  
  const timestampByCategory = dfGroupedByCategory.col(['Timestamp']).min();
  timestampByCategory.columns[1] = 'Timestamp_min';


  dfFinal = dfd.merge({
    left: dfNewByCategory,
    right: timestampByCategory,
    on: [`${category}`],
    how: 'left',
  });

  
  /**
   * Response time is calculated using a simple average of all values in the same category.
   * Evaluated result is a new DataFrame column, which is then merged to dfFinal
   * Note: danfo.js merge method indexes the data in the 'left' property to values in the 'right' 
   * property, thereby insuring correct order.
   */
  const resTimeDFMethod = dfGroupedByCategory.col(['cycleDuration']).mean();

  dfFinal = dfd.merge({
    left: dfFinal,
    right: resTimeDFMethod,
    on: [`${category}`],
    how: 'left',
  });

  /**
   * Client Error Count is an input to Client Error Rate; calculated as a sum of all of all rows
   * with a 1 value in the 'clientErr' column, representing a clientError as logged 
   * by the Venus agent.
   */
  const clientErrorDFMethod = dfGroupedByCategory.col(['clientError']).sum();
  clientErrorDFMethod.columns[1] = 'client_err_count';

  dfFinal = dfd.merge({
    left: dfFinal,
    right: clientErrorDFMethod,
    on: [`${category}`],
    how: 'left',
  });

  /**
   * Client Error Rate is calculated as:
   *  responses with a status code matching the client error category (per errCode_Config.js) 
   *  divided by total responses
   */
  const clientErrorRateColMethod = dfFinal.client_err_count
    .div(dfFinal[categoryCountLabel])
    .mul(100);
  
  dfFinal.addColumn({
    column: 'Client Error (%)',
    value: clientErrorRateColMethod.col_data[0],
  }); 

  /**
   * Server error count is an input to Availability Rate; calculated as a sum of all of all rows
   * with a 1 value in the 'serverErr' column, representing a serverError as logged 
   * by the Venus agent.
   */
  const serverErrorDFMethod = dfGroupedByCategory.col(['serverError']).sum();
  serverErrorDFMethod.columns[1] = 'server_err_count';
  dfFinal = dfd.merge({
    left: dfFinal,
    right: serverErrorDFMethod,
    on: [`${category}`],
    how: 'left',
  });

  /**
   * Server Error Rate is calculated as:
   *  responses with a status code matching the server error category (per errCode_Config.js) 
   *  divided by total responses
   * Note: Availability Rate = 100% - Server Error Rate
   */
  const serverErrColMethod = dfFinal.server_err_count
    .div(dfFinal[categoryCountLabel])
    .mul(100);


  dfFinal.addColumn({
    column: 'Server Error (%)',
    value: serverErrColMethod.col_data[0],
  });
  
  /* Danfo.js .loc() method returns a DataFrame with a subset of columns including solely the calculated metrics */
  const outputTable = dfFinal.loc({
    columns: [
      `${categoryLabel}`,
      `${categoryCountLabel}`,
      'cycleDuration_mean',
      'Client Error (%)',
      'Server Error (%)',
      'Timestamp_min',
    ],
  });
  
  /**
   * Load is calculated as request count divided by stream window (sliding window time frame, in minutes)
   * Calculation is done at the end given that the original figures are needed for the percentage calculations
   */
  outputTable[categoryCountLabel] = outputTable[categoryCountLabel].div(STREAM_WINDOW);
  return outputTable;
}



/**
 * Function to convert a row in a Danfo.js DataFrame to an object
 * @param {array} row -> Danfo.js DataFrame row
 * @param {string} service (optional) -> passed in when constructing service-level object and 
 * appends a service key:value pair with the service host (e.g. finance.google.com)
 * NOTE: status property is merely a placeholder. Status is currently being evaluated on the front-end
 */
function rowToObj(row, service = false) {
  const newObj = {};
  if (service) newObj.service = service;
  newObj.load = `${Math.ceil(row[1])} hpm`;
  newObj.response_time = Math.round(row[2]);
  newObj.error = Math.round(row[3]);
  newObj.availability = Math.round(100 - row[4]);
  newObj.timestamp = String(row[5]);
  return newObj;
}

/**
 * Function to convert entire DataFrame to an object with aggregate statistics and method-level statistics
 * Note: while the conversion from JavaScript native data structure to Danfo back to JavaScript may
 * seem redundant, vectorization with Pandas series (underlying methodology in Danfo.js) is ~400x
 * more runtime efficient on average than native JS looping
 * @param {array} row -> Danfo.js DataFrame row
 * @param {string} service (optional) -> passed in when constructing service-level object and 
 * appends a service key:value pair with the service host (e.g. finance.google.com)
 * NOTE: status property is merely a placeholder. Status is currently being evaluated on the front-end
 */
function aggregateStatsToObj(df) {
  const newObj = {};
  const totalRequests = df.reqHost.count();
  const totalResponses = df.resStatusCode.count();
  const totalClientErrors = df['clientError'].sum();
  newObj.error = Math.round(totalClientErrors / totalResponses * 100);
  newObj.load = `${Math.ceil(totalRequests / STREAM_WINDOW)} hpm`;
  newObj.response_time = Math.round(df.cycleDuration.mean());
  const totalServerErrors = df['serverError'].sum();
  newObj.availability = Math.round(100 - (totalServerErrors / totalRequests) * 100);
  newObj.timestamp = String(df['Timestamp'].min());
  const aggregateOutputTable = rtDataByCategory(df, 'reqMethod');
  newObj.byMethod = {};
  
  /* iterate through each request method and invoke rowToObj to construct method-level object */
  aggregateOutputTable.data.forEach((row) => {
    const method = row[0];
    newObj.byMethod[method] = rowToObj(row);
  });
  return newObj;
}

module.exports = {
  rtDataByCategory,
  rowToObj,
  aggregateStatsToObj,
};
