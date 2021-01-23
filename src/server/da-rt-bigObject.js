/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { TFEOpAttr } = require("@tensorflow/tfjs-node/dist/tfjs_binding");
const dfd = require("danfojs-node");
// const { streamName } = require('./redis-stream');
const PATH_BREAKDOWN = true;

// // also requires running npm i @tensorflow/tfjs-node

const responseData = [
  {
    reqMethod: "GET",
    reqHost: "curriculum-api.codesmith.io",
    reqPath: "/messages",
    reqUrl: "https://curriculum-api.codesmith.io/messages",
    resStatusCode: 200,
    cycleDuration: 1232,
    resMessage: "OK",
  },
  {
    reqMethod: "POST",
    reqHost: "curriculum-api.codesmith.io",
    reqPath: "/messages",
    reqUrl: "https://curriculum-api.codesmith.io/messages",
    resStatusCode: 400,
    cycleDuration: 1300,
    resMessage: "OK",
  },
  {
    reqMethod: "GET",
    reqHost: "finance.yahoo.com",
    reqPath: "/TSLA",
    reqUrl: "https://finance.yahoo.com/TSLA",
    resStatusCode: 400,
    cycleDuration: 1500,
    resMessage: "OK",
  },
  {
    reqMethod: "DELETE",
    reqHost: "finance.yahoo.com",
    reqPath: "/AAPL",
    reqUrl: "https://finance.yahoo.com/AAPL",
    resStatusCode: 200,
    cycleDuration: 1335,
    resMessage: "OK",
  },
  {
    reqMethod: "GET",
    reqHost: "weather.google.com",
    reqPath: "/California/LA",
    reqUrl: "https://weather.google.com/California/LA",
    resStatusCode: 200,
    cycleDuration: 1200,
    resMessage: "OK",
  },
  {
    reqMethod: "PATCH",
    reqHost: "weather.google.com",
    reqPath: "/California/SF",
    reqUrl: "https://weather.google.com/California/SF",
    resStatusCode: NaN,
    cycleDuration: 1100,
    resMessage: "OK",
  },
];

// TODO aggregate level
// FIXME sta  tusCode and duration will be stored as strings
// TODO health indicator data should be calculated here as well

/**
 * extract array of unique hostnames (tensor) and assign to variable
 * declare empty object ({hostname: { dataObj } })
 * forEach unique host
 *   declare new object
 *    host:
 *    totalRequests: count
 *    totalResponses: count
 *    successResponses: query status code <400
 *    Availability: responses / totalRequests
 *    success rate: successResponses / totalResponses
 *    avgDuration: simple mean
 *    recByTypeCount:
 *     count GET / POST / PUT / DELETE / PATCH:
 *    recByTypeBreakdown:
 *      GET / POST / PUT / DELETE / PATCH divided by totalRequests:
 *    paths: query unique paths
 *    forEach unique path
 *      declare new object and repeat all the operations above
 */

// if (pathParse) return output;
// const uniquePaths = dfHost['reqPath'].unique().data;

// TODO group host+path in hierarchical order

// extract unique paths from table

// console.log(uniqueHosts);

const rtData = (data) => {
  // data at the service level 
  // start adding calculated columns 
    // error rate -- already exists 
    // Availability 
  // Average latency -- .mean()
  // load -- .count() / 3 (dynamic value tied to stream time window)

  
  const dataframes = []; // create an array of dataframes to work with 
  let df = new dfd.DataFrame(data);
  // df.print(); 


  
  // const topLevelObj = analyzer(df);
  // dataframes.push(topLevelObj); 

  const dfGroup = df.groupby(['reqHost']);
  // const dfNew = new dfd.DataFrame(dfGroup.data);
  const dfNew = dfGroup.col(['reqHost']).count();

  const errorResRows = df.query({ column: 'resStatusCode', is: ">=", to: 400 });
  
  const errorDF = errorResRows.groupby(['reqHost']); 
  const newErrorDF = errorDF.col(['resStatusCode']).count(); 
  // newErrorDF.print();
  
  dfNew.print();

  let finalTable = dfd.merge({ left: dfNew, right: newErrorDF, on:['reqHost'], how: 'left' });

  const latencyDF = dfGroup.col(['cycleDuration']).mean(); 
  

  finalTable = dfd.merge({ left: finalTable, right: latencyDF, on:['reqHost'], how: 'left' });

  const availabilityDF = dfGroup.col(['resStatusCode']).count();
  // availabilityDF.print()
  finalTable = dfd.merge({ left: finalTable, right: availabilityDF, on:['reqHost'], how: 'left' });

  finalTable.fillna({ values: [0], inplace: true }); 

  //   const totalResponses = finalTable.loc({ columns: ['resStatusCode_1'] }); 
  //   const errorResponses = finalTable.loc({ columns: ['resStatusCode'] }); 
  
  const errorRateCol = finalTable[`resStatusCode_count`].div(finalTable[`resStatusCode_count_1`]).mul(100);
  
  //   const errorRate = errorRequests.div(totalRequests).mul(100);
  //   // console.log(errorRate);
  finalTable.addColumn({
    column: "Error (%)",
    value: errorRateCol.col_data[0],
  });

    
  // console.log(finalTable); 
  
  const availabilityCol = finalTable[`resStatusCode_count_1`].div(finalTable[`reqHost_count`]).mul(100);
  
  // availabilityCol.print();
  finalTable.addColumn({
    column: 'Availability (%)',
    value: availabilityCol.col_data[0],
  });

  let outputTable = finalTable.loc({ columns: ['reqHost', 'reqHost_count', 'cycleDuration_mean', 'Error (%)', 'Availability (%)'] });

  outputTable[`reqHost_count`] = outputTable[`reqHost_count`].div(3);

  console.log('Final Table: ', outputTable); 
  outputTable.print(); 

  const consolidatedObj = {};
  consolidatedObj.services = []; 
  
  
  outputTable.data.forEach((row) => {
    const outputObj = {}; 

    outputObj['Service'] = row[0];
    outputObj['Load'] = row[1];
    outputObj['Latency'] = row[2];
    outputObj['Error_Percentage'] = row[3];
    outputObj['Availability_Percentage'] = row[4]; 
    
    consolidatedObj.services.push(outputObj); 
  });

  console.log(consolidatedObj); 

  df.print();  
  

  
  
  // console.log(dfNew);
  
  // console.log(dfGroup);
  // dfGroup.print() 
  // dfGroup.col(['resStatusCode']).count().print(); 
  
  // dfGroup.print(); 
  

  // df.print();
  // group by host
  // const uniqueHosts = df["reqHost"].unique().data;

  // uniqueHosts.forEach((host) => {
  //   const dfHost = df.query({ column: "reqHost", is: "==", to: host }); //creates dataframe for each service
  //   const newObj = analyzer(dfHost);
  //   dataframes.push(newObj); 
  // });

  // hostRows.print();
  // function analyzer(dfHost) {
    
  //   const errorResRows = dfHost.query({ column: 'resStatusCode', is: ">=", to: 400 }); //creates dataframe for each service
  //   // errorTest.print()
    
  //   // const groupErrorByHost = errorResRows.groupby(['reqHost', 'reqMethod']);
  //   // groupErrorByHost.col(['reqHost']).count().print();
  //   // console.log(groupErrorByHost);
  //   // const groupErrorTable = new dfd.DataFrame(groupErrorByHost.data);
  //   // groupErrorTable.print();

  //   const groupErrorByMethod = errorResRows.groupby(['reqMethod']); 
  //   const rightTable = groupErrorByMethod.col(['reqMethod']).count();

  //   const groupByMethod = dfHost.groupby(['reqMethod']); 
  //   const leftTable = groupByMethod.col(['reqMethod']).count();

  //   // leftTable.print(); 
    
  //   const finalTable = dfd.merge({ left: leftTable, right: rightTable, on:['reqMethod'], how: 'left' }); 

  //   finalTable.fillna({ values: [0], inplace: true }); 

    
  //   // finalTable.print();

  //   const reqMethods = finalTable.loc({ columns: ['reqMethod'] }); 
  //   const totalRequests = finalTable.loc({ columns: ['reqMethod_count'] }); 
  //   const errorRequests = finalTable.loc({ columns: ['reqMethod_count_1'] }); 

  //   const errorRate = errorRequests.div(totalRequests).mul(100);
  //   // console.log(errorRate);
  //   reqMethods.addColumn({
  //     column: "errorPercentage",
  //     value: errorRate.col_data[0],
  //   });

  //   // console.log(finalTableFilled); 
  //   reqMethods.print(); 

  //   // const json = reqMethods.to_json({ orient: 'records' }); 
  //   reqMethods.to_json({ orient: 'records' })
  //     .then(json => json)
  //     .catch(err => console.log('Json error', err));
  // }
};

rtData(responseData); 