/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const dfd = require('danfojs-node');
const { clientErrCodes, serverErrCodes} = require('./errCode_Config');

const STREAM_WINDOW = 3;

// #region 
const responseData = [
  {
    id: '1611550512393-1',
    reqMethod: 'GET',
    reqHost: 'curriculum-api.codesmith.io',
    reqPath: '/messages',
    reqUrl: 'https://curriculum-api.codesmith.io/messages',
    resStatusCode: '200',
    cycleDuration: '1232',
    resMessage: 'OK',
  },
  {
    id: '1144550577793-1',
    reqMethod: 'POST',
    reqHost: 'curriculum-api.codesmith.io',
    reqPath: '/messages',
    reqUrl: 'https://curriculum-api.codesmith.io/messages',
    resStatusCode: '400',
    cycleDuration: '1300',
    resMessage: 'OK',
  },
  {
    id: '1611550514493-1',
    reqMethod: 'GET',
    reqHost: 'finance.yahoo.com',
    reqPath: '/TSLA',
    reqUrl: 'https://finance.yahoo.com/TSLA',
    resStatusCode: '500',
    cycleDuration: '1500',
    resMessage: 'OK',
  },
  {
    id: '1611550514593-1',
    reqMethod: 'DELETE',
    reqHost: 'finance.yahoo.com',
    reqPath: '/AAPL',
    reqUrl: 'https://finance.yahoo.com/AAPL',
    resStatusCode: '200',
    cycleDuration: '1335',
    resMessage: 'OK',
  },
  {
    id: '1611550514593-1',
    reqMethod: 'GET',
    reqHost: 'weather.google.com',
    reqPath: '/California/LA',
    reqUrl: 'https://weather.google.com/California/LA',
    resStatusCode: '200',
    cycleDuration: '1200',
    resMessage: 'OK',
  },
  {
    id: '1611550598793-1',
    reqMethod: 'PATCH',
    reqHost: 'weather.google.com',
    reqPath: '/California/SF',
    reqUrl: 'https://weather.google.com/California/SF',
    resStatusCode: NaN,
    cycleDuration: '1100',
    resMessage: 'OK',
  },
  {
    id: '1611550577793-1',
    reqMethod: 'GET',
    reqHost: 'curriculum-api.codesmith.io',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    cycleDuration: '1105.248547',
    resMessage: 'OK',
  },
  {
    id: '1611550577793-1',
    reqMethod: 'POST',
    reqHost: 'weather.google.com',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    cycleDuration: '1105.248547',
    resMessage: 'OK',
  },
  {
    id: '1611550577793-1',
    reqMethod: 'PUT',
    reqHost: 'finance.yahoo.com',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    cycleDuration: '1105.248547',
    resMessage: 'OK',
  },
];
// #endregion

// FIXME update logic (this file and wrapper) to properly handle no response

// const mapObjects = [];
// responseData.forEach((obj) => {
//   const newMap = new Map();
//   for (const key in obj) {
//     newMap.set(key, obj[key]);
//   }
//   mapObjects.push(newMap);
// })


responseData.forEach((obj) => {
  if (!obj.id) obj.id = `${Date.now()}-0`;
  if (!obj.reqMethod) obj.reqMethod = 'GET';
  if (!obj.reqHost) obj.reqHost = 'Other';
  if (!obj.reqPath) obj.reqPath = '/';
  if (!obj.resStatusCode) obj.resStatusCode = NaN;
  if (!obj.resMessage) obj.resMessage = 'No message';
  if (!obj.cycleDuration) obj.cycleDuration = NaN;
})

//  

// console.log(responseData);

const rtData = (data) => {
  // hacky code to try conforming the objects in case one is missing a property
  
  const df = new dfd.DataFrame(data);


  // column with response status codes
  const errorTable = df.loc({
    columns: [
      'resStatusCode'
    ]
  })

  // iterate through status codes and check against client error codes and server error codes in the config file
  // if not found in either object, assign 'no-error'
  const errorCategory = [];
    // boolean will be set to true if 1 or more client/server errors exist 
    // if false, df.query will not be invoked given the function's error handling
    let clientErrExists = false;
    let serverErrExists = false;
    errorTable.data.forEach(statusCode => {
      if (clientErrCodes[statusCode]) {
        errorCategory.push('client-error')
        clientErrExists = true;
      } else if (serverErrCodes[statusCode]) {
        errorCategory.push('server-error')
        serverErrExists = true;
      } else errorCategory.push('no-error')
    });

    // add response status column to data frame
    df.addColumn({
      column: "status",
      value: errorCategory,
    })

  df['cycleDuration'] = df['cycleDuration'].astype('int32')
  df['resStatusCode'] = df['resStatusCode'].astype('int32')

  const dfGroup = df.groupby(['reqHost']);
  const dfNew = dfGroup.col(['reqHost']).count();


  let finalTable;
  const consolidatedObj = {};
  
  const resTimeDF = dfGroup.col(['cycleDuration']).mean();

  finalTable = dfd.merge({
    left: dfNew,
    right: resTimeDF,
    on: ['reqHost'],
    how: 'left',
  });
  
  
    if (clientErrExists) {
      const clientErrorResRows = df.query({ column: 'status', is: '==', to: 'client-error' });
      const clientErrorDF = clientErrorResRows.groupby(['reqHost']);
      const newClientErrorDF = clientErrorDF.col(['resStatusCode']).count();
      newClientErrorDF.columns[1] = 'client_err_count';
      // newErrorDF.print();
      // console.log('CLIENT ERROR', newClientErrorDF)

      // dfNew.print();

      finalTable = dfd.merge({
        left: finalTable,
        right: newClientErrorDF,
        on: ['reqHost'],
        how: 'left',
      });

      finalTable.fillna({ values: [0], inplace: true });


      // console.log(finalTable);
      // finalTable.print();
      const clientErrorRateCol = finalTable.client_err_count
        .div(finalTable.reqHost_count)
        .mul(100);
      
      finalTable.addColumn({
        column: 'Client Error (%)',
        value: clientErrorRateCol.col_data[0],
      });
    } 

    
    if (serverErrExists) {
      const serverErrorResRows = df.query({ column: 'status', is: '==', to: 'server-error' });
      const serverErrorDF = serverErrorResRows.groupby(['reqHost']);
      const newServerErrorDF = serverErrorDF.col(['resStatusCode']).count();
      newServerErrorDF.columns[1] = 'server_err_count';
      // availabilityDF.print()
      finalTable = dfd.merge({
        left: finalTable,
        right: newServerErrorDF,
        on: ['reqHost'],
        how: 'left',
      });

      finalTable.fillna({ values: [0], inplace: true });
      
      const serverErrCol = finalTable.server_err_count
        .div(finalTable.reqHost_count)
        .mul(100);

      // availabilityCol.print();
      finalTable.addColumn({
        column: 'Server Error (%)',
        value: serverErrCol.col_data[0],
      });
    } 
  
  finalTable.print();
  // console.log(finalTable);

  const outputTable = finalTable.loc({
    columns: [
      'reqHost',
      'reqHost_count',
      'cycleDuration_mean',
      'Client Error (%)',
      'Server Error (%)',
    ],
  });

  outputTable.reqHost_count = outputTable.reqHost_count.div(3);

  // console.log('Final Table: ', outputTable);
  // outputTable.print();

  
  consolidatedObj.services = [];

  outputTable.data.forEach((row) => {
    const outputObj = {};
    console.log(row)
    outputObj.service = row[0];
    outputObj.status = 'good';
    outputObj.load = `${Math.round(row[1])  } hpm`;
    outputObj.response_time = Math.round(row[2]);
    outputObj.error = Math.round(row[3]);
    outputObj.availability = 100 - row[4];

    consolidatedObj.services.push(outputObj);
  });


  // FOR OVERALL AGGREGATE STATISTICS

  consolidatedObj.aggregate = {};

  try {
    const errorResRowsTotal = df.query({
      column: 'resStatusCode',
      is: '>=',
      to: 400,
    });
    const newErrorDFTotal = errorResRowsTotal.resStatusCode.count();
    consolidatedObj.aggregate.error = (newErrorDFTotal / totalResponses) * 100;
  } catch (err) {
    consolidatedObj.aggregate.error = 0;
  }
  
  const totalRequests = df.reqHost.count();
  const totalResponses = df.resStatusCode.count();
  consolidatedObj.aggregate.status = 'good';
  // total
  consolidatedObj.aggregate.load = `${(totalRequests / STREAM_WINDOW).toFixed(2) } hpm`;
  consolidatedObj.aggregate.response_time = Math.round(
    df.cycleDuration.mean(),
  );
  consolidatedObj.aggregate.availability = Math.round(
    (totalResponses / totalRequests) * 100,
  );

  const uniqueHosts = df.reqHost.unique().data;

  uniqueHosts.forEach((host) => {
    const dfHost = df.query({ column: 'reqHost', is: '==', to: host });

    const dfGroupMethod = dfHost.groupby(['reqMethod']);
    const dfNewMethod = dfGroupMethod.col(['reqMethod']).count();

    try {
      const errorResRowsMethod = dfHost.query({
        column: 'resStatusCode',
        is: '>=',
        to: 400,
      });

      const errorDFMethod = errorResRowsMethod.groupby(['reqMethod']);
      const newErrorDFMethod = errorDFMethod.col(['resStatusCode']).count();
      // newErrorDFMethod.print();

      // dfNew.print();

      let finalTableMethod = dfd.merge({
        left: dfNewMethod,
        right: newErrorDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      const resTimeDFMethod = dfGroupMethod.col(['cycleDuration']).mean();

      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: resTimeDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      const availabilityDFMethod = dfGroupMethod.col(['resStatusCode']).count();
      // availabilityDF.print()
      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: availabilityDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      finalTableMethod.fillna({ values: [0], inplace: true });

      //   const totalResponses = finalTable.loc({ columns: ['resStatusCode_1'] });
      //   const errorResponses = finalTable.loc({ columns: ['resStatusCode'] });

      const errorRateColMethod = finalTableMethod.resStatusCode_count
        .div(finalTableMethod.resStatusCode_count_1)
        .mul(100);

      //   const errorRate = errorRequests.div(totalRequests).mul(100);
      //   // console.log(errorRate);
      finalTableMethod.addColumn({
        column: 'Error (%)',
        value: errorRateColMethod.col_data[0],
      });

      // console.log(finalTableMethod);

      const availabilityColMethod = finalTableMethod.resStatusCode_count_1
        .div(finalTableMethod.reqMethod_count)
        .mul(100);

      // availabilityCol.print();
      finalTableMethod.addColumn({
        column: 'Availability (%)',
        value: availabilityColMethod.col_data[0],
      });

      // finalTableMethod.print();

      const outputTableMethod = finalTableMethod.loc({
        columns: [
          'reqMethod',
          'reqMethod_count',
          'cycleDuration_mean',
          'Error (%)',
          'Availability (%)',
        ],
      });

      outputTableMethod.reqMethod_count = outputTableMethod.reqMethod_count.div(3);

      // console.log('Final Table: ', outputTableMethod);
      // outputTableMethod.print();

      outputTableMethod.data.forEach((row, i) => {
        // console.log('ROW', row)
        consolidatedObj.services[i].byMethod = {};
        const method = row[0];
        consolidatedObj.services[i].byMethod[method] = {};
        consolidatedObj.services[i].byMethod[method].status = 'good';
        consolidatedObj.services[i].byMethod[method].load = `${row[1].toFixed(2)  }hpm`;
        consolidatedObj.services[i].byMethod[method].response_time = row[2];
        consolidatedObj.services[i].byMethod[method].error = row[3];
        consolidatedObj.services[i].byMethod[method].availability = row[4];
      });

      // console.log('FINAL OBJECT', consolidatedObj);
    } catch (e) {
      finalTableMethod = dfNewMethod;

      const resTimeDFMethod = dfGroupMethod.col(['cycleDuration']).mean();

      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: resTimeDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      const availabilityDFMethod = dfGroupMethod.col(['resStatusCode']).count();
      // availabilityDF.print()
      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: availabilityDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      finalTableMethod.fillna({ values: [0], inplace: true });

      //   const totalResponses = finalTable.loc({ columns: ['resStatusCode_1'] });
      //   const errorResponses = finalTable.loc({ columns: ['resStatusCode'] });


      //   const errorRate = errorRequests.div(totalRequests).mul(100);
      //   // console.log(errorRate);

      // console.log(finalTableMethod);

      const availabilityColMethod = finalTableMethod.resStatusCode_count
        .div(finalTableMethod.reqMethod_count)
        .mul(100);

      // availabilityCol.print();
      finalTableMethod.addColumn({
        column: 'Availability (%)',
        value: availabilityColMethod.col_data[0],
      });

      // finalTableMethod.print();

      const outputTableMethod = finalTableMethod.loc({
        columns: [
          'reqMethod',
          'reqMethod_count',
          'cycleDuration_mean',
          'Availability (%)',
        ],
      });

      outputTableMethod.reqMethod_count = outputTableMethod.reqMethod_count.div(3);

      // console.log('Final Table: ', outputTableMethod);
      // outputTableMethod.print();

      // each method is a property with the subset data as a nested object
      console.log(outputTableMethod.data)
      outputTableMethod.data.forEach((row, i) => {
        // console.log('ROW', row)
        consolidatedObj.services[i].byMethod = {};
        const method = row[0];
        consolidatedObj.services[i].byMethod[method] = {};
        consolidatedObj.services[i].byMethod[method].status = 'good';
        consolidatedObj.services[i].byMethod[method].load = `${row[1].toFixed(2)  }hpm`;
        consolidatedObj.services[i].byMethod[method].response_time = row[2];
        consolidatedObj.services[i].byMethod[method].error = 0;
        consolidatedObj.services[i].byMethod[method].availability = row[3];
      });

      // console.log('FINAL OBJECT', consolidatedObj);
    }
  });
  // console.log(JSON.stringify(consolidatedObj));
  console.log(consolidatedObj);
  console.log(consolidatedObj.services[0]);
  return JSON.stringify(consolidatedObj);
};

// module.exports = rtData;

rtData(responseData);

