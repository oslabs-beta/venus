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
    resStatusCode: 200,
    cycleDuration: 1100,
    resMessage: "OK",
  },
];

// TODO aggregate level
// FIXME statusCode and duration will be stored as strings
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
  df.print()
  
  const topLevelObj = analyzer(df);
  dataframes.push(topLevelObj); 

  const dfGroup = df.groupby(['reqHost']); 
  dfGroup.col(['resStatusCode']).count().print(); 
  
  // dfGroup.print(); 
  

  // df.print();
  // group by host
  const uniqueHosts = df["reqHost"].unique().data;

  uniqueHosts.forEach((host) => {
    const dfHost = df.query({ column: "reqHost", is: "==", to: host }); //creates dataframe for each service
    const newObj = analyzer(dfHost);
    dataframes.push(newObj); 
  });

  // hostRows.print();
  function analyzer(dfHost) {
    
    const errorResRows = dfHost.query({ column: 'resStatusCode', is: ">=", to: 400 }); //creates dataframe for each service
    // errorTest.print()
    
    // const groupErrorByHost = errorResRows.groupby(['reqHost', 'reqMethod']);
    // groupErrorByHost.col(['reqHost']).count().print();
    // console.log(groupErrorByHost);
    // const groupErrorTable = new dfd.DataFrame(groupErrorByHost.data);
    // groupErrorTable.print();

    const groupErrorByMethod = errorResRows.groupby(['reqMethod']); 
    const rightTable = groupErrorByMethod.col(['reqMethod']).count();

    const groupByMethod = dfHost.groupby(['reqMethod']); 
    const leftTable = groupByMethod.col(['reqMethod']).count();

    // leftTable.print(); 
    
    const finalTable = dfd.merge({ left: leftTable, right: rightTable, on:['reqMethod'], how: 'left' }); 

    finalTable.fillna({ values: [0], inplace: true }); 

    
    // finalTable.print();

    const reqMethods = finalTable.loc({ columns: ['reqMethod'] }); 
    const totalRequests = finalTable.loc({ columns: ['reqMethod_count'] }); 
    const errorRequests = finalTable.loc({ columns: ['reqMethod_count_1'] }); 

    const errorRate = errorRequests.div(totalRequests).mul(100);
    // console.log(errorRate);
    reqMethods.addColumn({
      column: "errorPercentage",
      value: errorRate.col_data[0],
    });

    // console.log(finalTableFilled); 
    reqMethods.print(); 

    // const json = reqMethods.to_json({ orient: 'records' }); 
    reqMethods.to_json({ orient: 'records' })
      .then(json => json)
      .catch(err => console.log('Json error', err));
  }
};

rtData(responseData); 