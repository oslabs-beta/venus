/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const dfd = require('danfojs-node');

// config objects descerning between client and server errors 
const { clientErrCodes, serverErrCodes} = require('./errCode_Config');

const STREAM_WINDOW = 3;

// FIXME add status to venus listener 

// #region 
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
    resMessage: 'OK',
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
    resMessage: 'OK',
    cycleDuration: '1300',
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
    resMessage: 'OK',
    cycleDuration: '1500',
  },
  {
    id: '1611550514593-1',
    reqHost: 'finance.yahoo.com',
    reqMethod: 'DELETE',
    reqPath: '/AAPL',
    reqUrl: 'https://finance.yahoo.com/AAPL',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1335',
  },
  {
    id: '1611550514593-1',
    reqHost: 'weather.google.com',
    reqMethod: 'GET',
    reqPath: '/California/LA',
    reqUrl: 'https://weather.google.com/California/LA',
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
    reqUrl: 'https://weather.google.com/California/SF',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1100',
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
    id: '1611550577793-1',
    reqHost: 'weather.google.com',
    reqMethod: 'POST',
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
    id: '1611550577793-1',
    reqHost: 'finance.yahoo.com',
    reqMethod: 'PUT',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    clientError: '0',
    serverError: '0',
    noError: '1',
    resMessage: 'OK',
    cycleDuration: '1105.248547',
  },
];

const rtData = (data) => {
  // hacky code to try conforming the objects in case one is missing a property
  
  const df = new dfd.DataFrame(data);


  // column with response status codes
  // const errorTable = df.loc({
  //   columns: [
  //     'resStatusCode'
  //   ]
  // })

  // iterate through status codes and check against client error codes and server error codes in the config file
  // if not found in either object, assign 'no-error'
  // const errorCategory = [];
  //   // boolean will be set to true if 1 or more client/server errors exist 
  //   // if false, df.query will not be invoked given the function's error handling
  //   let clientErrExists = false;
  //   let serverErrExists = false;
  //   errorTable.data.forEach(statusCode => {
  //     if (clientErrCodes[statusCode]) {
  //       errorCategory.push('client-error')
  //       clientErrExists = true;
  //     } else if (serverErrCodes[statusCode]) {
  //       errorCategory.push('server-error')
  //       serverErrExists = true;
  //     } else errorCategory.push('no-error')
  //   });

  //   // add response status column to data frame
  //   df.addColumn({
  //     column: "status",
  //     value: errorCategory,
  //   })

  df['clientError'].print();

  df['cycleDuration'] = df['cycleDuration'].astype('int32')
  df['resStatusCode'] = df['resStatusCode'].astype('int32')
  df['clientError'] = df['clientError'].astype('int32')
  df['serverError'] = df['serverError'].astype('int32')
  df['noError'] = df['noError'].astype('int32')

  const dfGroup = df.groupby(['reqHost']);
  const dfNew = dfGroup.col(['reqHost']).count();
  console.log('dfNew TABLE');
  df.print()


  let finalTable;
  const consolidatedObj = {};
  
  const resTimeDF = dfGroup.col(['cycleDuration']).mean();

  finalTable = dfd.merge({
    left: dfNew,
    right: resTimeDF,
    on: ['reqHost'],
    how: 'left',
  });
  
    // declaring outside of conditional scope for aggregate reference
    // if (clientErrExists) {
      // const clientErrorResRows = df.query({ column: 'status', is: '==', to: 'client-error' });
      
      // const clientTest = df.groupby(['reqHost']);
      const clientErrorDF = dfGroup.col(['clientError']).sum();
      // let newClientErrorDF = df.col(['clientError']).count();
      // console.log('new client error DF', newClientErrorDF);
      clientErrorDF.columns[1] = 'client_err_count';

      finalTable = dfd.merge({
        left: finalTable,
        right: clientErrorDF,
        on: ['reqHost'],
        how: 'left',
      });

      finalTable.fillna({ values: [0], inplace: true });
      console.log('CLIENT ERROR TABLE BELOW')
      finalTable.print();


      // console.log(finalTable);
      // finalTable.print();
      const clientErrorRateCol = finalTable.client_err_count
        .div(finalTable.reqHost_count)
        .mul(100);
      
      finalTable.addColumn({
        column: 'Client Error (%)',
        value: clientErrorRateCol.col_data[0],
      });
    // } 

    // declaring outside of conditional scope for aggregate reference
    // let newServerErrorDF;
    // if (serverErrExists) {
      // const serverErrorResRows = df.query({ column: 'status', is: '==', to: 'server-error' });
      // const serverErrorDF = serverErrorResRows.groupby(['reqHost']);
      const serverErrorDF = dfGroup.col(['serverError']).sum();
      serverErrorDF.columns[1] = 'server_err_count';
      // availabilityDF.print()
      finalTable = dfd.merge({
        left: finalTable,
        right: serverErrorDF,
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
    // } 
  
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
    outputObj.load = `${Math.ceil(row[1])  } hpm`;
    outputObj.response_time = Math.round(row[2]);
    outputObj.error = Math.round(row[3]);
    outputObj.availability = Math.round(100 - row[4]);

    consolidatedObj.services.push(outputObj);
  });


  // FOR OVERALL AGGREGATE STATISTICS

  consolidatedObj.aggregate = {};

  const totalRequests = df.reqHost.count();
  const totalResponses = df.resStatusCode.count();
  const totalClientErrors = clientErrorDF.col_data[0].length;
  consolidatedObj.aggregate.error = Math.round(totalClientErrors / totalResponses * 100)

  consolidatedObj.aggregate.status = 'good';
  // total
  consolidatedObj.aggregate.load = `${Math.ceil(totalRequests / STREAM_WINDOW) } hpm`;
  consolidatedObj.aggregate.response_time = Math.round(
    df.cycleDuration.mean(),
  );
  
  const totalServerErrors = serverErrorDF.col_data[0].length;
  consolidatedObj.aggregate.availability = Math.round( 100 -
    (totalServerErrors / totalRequests) * 100
  );

  const uniqueHosts = df.reqHost.unique().data;

  uniqueHosts.forEach((host, hostIndex) => {
    const dfHost = df.query({ column: 'reqHost', is: '==', to: host });
    
    // column with response status codes
    const errorTableMethod = dfHost.loc({
      columns: [
        'resStatusCode'
      ]
    })

      const dfGroupMethod = dfHost.groupby(['reqMethod']);
      const dfNewMethod = dfGroupMethod.col(['reqMethod']).count();

      let finalTableMethod;      

      const resTimeDFMethod = dfGroupMethod.col(['cycleDuration']).mean();

      finalTableMethod = dfd.merge({
        left: dfNewMethod,
        right: resTimeDFMethod,
        on: ['reqMethod'],
        how: 'left',
        });

      const clientErrorDFMethod = dfGroupMethod.col(['clientError']).sum();
      clientErrorDFMethod.columns[1] = 'client_err_count';

      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: clientErrorDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      finalTableMethod.fillna({ values: [0], inplace: true });

      const clientErrorRateColMethod = finalTableMethod.client_err_count
        .div(finalTableMethod.reqMethod_count)
        .mul(100);
      
      finalTableMethod.addColumn({
        column: 'Client Error (%)',
        value: clientErrorRateColMethod.col_data[0],
      }); 
  
      const serverErrorDFMethod = dfGroupMethod.col(['serverError']).sum();
      serverErrorDFMethod.columns[1] = 'server_err_count';
      // availabilityDF.print()
      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: serverErrorDFMethod,
        on: ['reqMethod'],
        how: 'left',
      });

      finalTableMethod.fillna({ values: [0], inplace: true });
      
      console.log('table method error', finalTableMethod)
      
      const serverErrColMethod = finalTableMethod.server_err_count
        .div(finalTableMethod.reqMethod_count)
        .mul(100);


      // availabilityCol.print();
      finalTableMethod.addColumn({
        column: 'Server Error (%)',
        value: serverErrColMethod.col_data[0],
      });
        console.log('tablepreerror', finalTableMethod)
        const colLength = finalTableMethod.col_data[0].length;
        const zeroServerErrorsCol = [];
        for (let i = 0; i < colLength; i++) {
          zeroServerErrorsCol.push(0)
        }
        finalTableMethod.addColumn({
          column: 'Server Error (%)',
          value: zeroServerErrorsCol,
        });
      
      finalTableMethod.print()
    
    // finalTableMethod.print();
    // console.log(finalTableMethod);
  
    const outputTableMethod = finalTableMethod.loc({
      columns: [
        'reqMethod',
        'reqMethod_count',
        'cycleDuration_mean',
        'Client Error (%)',
        'Server Error (%)',
      ],
    });

    outputTableMethod.print();
  
    outputTableMethod.reqMethod_count = outputTableMethod.reqMethod_count.div(3);
      
      consolidatedObj.services[hostIndex].byMethod = {};
      outputTableMethod.data.forEach((row) => {
        // console.log('ROW', row)
        const method = row[0];
        console.log('METHOD BRUH', method)
        consolidatedObj.services[hostIndex].byMethod[method] = {};
        consolidatedObj.services[hostIndex].byMethod[method].status = 'good';
        consolidatedObj.services[hostIndex].byMethod[method].load = `${Math.ceil(row[1])} hpm`;
        consolidatedObj.services[hostIndex].byMethod[method].response_time = Math.round(row[2]);
        consolidatedObj.services[hostIndex].byMethod[method].error = Math.round(row[3]);
        consolidatedObj.services[hostIndex].byMethod[method].availability = Math.round(100 - row[4]);
      });
      // console.log('FINAL OBJECT', consolidatedObj);
  });
  // console.log(JSON.stringify(consolidatedObj));
  console.log(consolidatedObj);
  console.log(consolidatedObj.services[0]);
  return JSON.stringify(consolidatedObj);
}

// module.exports = rtData;

rtData(responseData);

