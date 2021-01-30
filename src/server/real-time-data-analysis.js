/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const dfd = require('danfojs-node');

const STREAM_WINDOW = 3;

// #region 
const responseData = [
//   // {
//   //   reqMethod: 'GET',
//   //   reqHost: 'curriculum-api.codesmith.io',
//   //   reqPath: '/messages',
//   //   reqUrl: 'https://curriculum-api.codesmith.io/messages',
//   //   resStatusCode: '200',
//   //   cycleDuration: '1232',
//   //   resMessage: 'OK',
//   // },
//   // {
//   //   reqMethod: 'POST',
//   //   reqHost: 'curriculum-api.codesmith.io',
//   //   reqPath: '/messages',
//   //   reqUrl: 'https://curriculum-api.codesmith.io/messages',
//   //   resStatusCode: '400',
//   //   cycleDuration: '1300',
//   //   resMessage: 'OK',
//   // },
//   // {
//   //   reqMethod: 'GET',
//   //   reqHost: 'finance.yahoo.com',
//   //   reqPath: '/TSLA',
//   //   reqUrl: 'https://finance.yahoo.com/TSLA',
//   //   resStatusCode: '400',
//   //   cycleDuration: '1500',
//   //   resMessage: 'OK',
//   // },
//   // {
//   //   reqMethod: 'DELETE',
//   //   reqHost: 'finance.yahoo.com',
//   //   reqPath: '/AAPL',
//   //   reqUrl: 'https://finance.yahoo.com/AAPL',
//   //   resStatusCode: '200',
//   //   cycleDuration: '1335',
//   //   resMessage: 'OK',
//   // },
//   // {
//   //   reqMethod: 'GET',
//   //   reqHost: 'weather.google.com',
//   //   reqPath: '/California/LA',
//   //   reqUrl: 'https://weather.google.com/California/LA',
//   //   resStatusCode: '200',
//   //   cycleDuration: '1200',
//   //   resMessage: 'OK',
//   // },
//   // {
//   //   reqMethod: 'PATCH',
//   //   reqHost: 'weather.google.com',
//   //   reqPath: '/California/SF',
//   //   reqUrl: 'https://weather.google.com/California/SF',
//   //   resStatusCode: NaN,
//   //   cycleDuration: '1100',
//   //   resMessage: 'OK',
//   // },
  {
    id: '1611550577793-1',
    reqMethod: 'GET',
    reqHost: 'curriculum-api.codesmith.io',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    resMessage: 'OK',
    cycleDuration: '1105.248547'
  },
  {
    id: '1611550577793-1',
    reqMethod: 'GET',
    reqHost: 'weather.google.com',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    resStatusCode: '200',
    resMessage: 'OK',
    cycleDuration: '1105.248547'
  },
  {
    id: '1611550577793-1',
    reqMethod: 'GET',
    reqHost: 'finance.yahoo.com',
    reqPath: '/messages/',
    reqUrl: 'https://curriculum-api.codesmith.io/messages/',
    cycleDuration: '1105.248547',
    resStatusCode: '200',
    resMessage: 'OK'
  },
];
// #endregion

// FIXME update logic (this file and wrapper) to properly handle no response

const rtData = (data) => {
  // hacky code to try conforming the objects in case one is missing a property
  
  const df = new dfd.DataFrame(data);
  df.ctypes.print();
  df.print()
  df['cycleDuration'] = df['cycleDuration'].astype('int32')
  df['resStatusCode'] = df['resStatusCode'].astype('int32')
  df.ctypes.print();
  df.print()

  const dfGroup = df.groupby(['reqHost']);
  const dfNew = dfGroup.col(['reqHost']).count();

  let finalTable;
  const consolidatedObj = {};
  
  try {
    const errorResRows = df.query({ column: 'resStatusCode', is: '>=', to: 400 });
    const errorDF = errorResRows.groupby(['reqHost']);
    const newErrorDF = errorDF.col(['resStatusCode']).count();
    // newErrorDF.print();

    // dfNew.print();

    finalTable = dfd.merge({
      left: dfNew,
      right: newErrorDF,
      on: ['reqHost'],
      how: 'left',
    });

    console.log(finalTable);
    const errorRateCol = finalTable.resStatusCode_count
      .div(finalTable.resStatusCode_count_1)
      .mul(100);
    
    finalTable.addColumn({
      column: 'Error (%)',
      value: errorRateCol.col_data[0],
    });

    const latencyDF = dfGroup.col(['cycleDuration']).mean();

  finalTable = dfd.merge({
    left: finalTable,
    right: latencyDF,
    on: ['reqHost'],
    how: 'left',
  });

  const availabilityDF = dfGroup.col(['resStatusCode']).count();
  // availabilityDF.print()
  finalTable = dfd.merge({
    left: finalTable,
    right: availabilityDF,
    on: ['reqHost'],
    how: 'left',
  });

  finalTable.fillna({ values: [0], inplace: true });

  //   const totalResponses = finalTable.loc({ columns: ['resStatusCode_1'] });
  //   const errorResponses = finalTable.loc({ columns: ['resStatusCode'] });

  

  //   const errorRate = errorRequests.div(totalRequests).mul(100);
  //   // console.log(errorRate);
  

  // console.log(finalTable);

  // console.log(finalTable)
  const availabilityCol = finalTable.resStatusCode_count_1
    .div(finalTable.reqHost_count)
    .mul(100);

  // availabilityCol.print();
  finalTable.addColumn({
    column: 'Availability (%)',
    value: availabilityCol.col_data[0],
  });

  const outputTable = finalTable.loc({
    columns: [
      'reqHost',
      'reqHost_count',
      'cycleDuration_mean',
      'Error (%)',
      'Availability (%)',
    ],
  });

  outputTable.reqHost_count = outputTable.reqHost_count.div(3);

  console.log('Final Table: ', outputTable);
  outputTable.print();

  
  consolidatedObj.services = [];

  outputTable.data.forEach((row) => {
    const outputObj = {};

    outputObj.service = row[0];
    outputObj.status = 'good';
    outputObj.load = `${row[1].toFixed(2)  }`;
    outputObj.response_time = row[2].toFixed(2);
    outputObj.error = row[3];
    outputObj.availability = row[4];

    consolidatedObj.services.push(outputObj);
  });

  } catch (err) {
    console.log('CATCH BLOCK FAM')
    finalTable = dfNew;
    const latencyDF = dfGroup.col(['cycleDuration']).mean();
    console.log('latency catch', latencyDF);

    finalTable = dfd.merge({
      left: finalTable,
      right: latencyDF,
      on: ['reqHost'],
      how: 'left',
    });

    finalTable.print()
  
    const availabilityDF = dfGroup.col(['resStatusCode']).count();
    // availabilityDF.print()
    finalTable = dfd.merge({
      left: finalTable,
      right: availabilityDF,
      on: ['reqHost'],
      how: 'left',
    });
  
    finalTable.fillna({ values: [0], inplace: true });
  
    // console.log(finalTable)
    const availabilityCol = finalTable.resStatusCode_count
      .div(finalTable.reqHost_count)
      .mul(100);
  
    // availabilityCol.print();
    finalTable.addColumn({
      column: 'Availability (%)',
      value: availabilityCol.col_data[0],
    });
  
    const outputTable = finalTable.loc({
      columns: [
        'reqHost',
        'reqHost_count',
        'cycleDuration_mean',
        'Availability (%)',
      ],
    });
  
    outputTable.reqHost_count = outputTable.reqHost_count.div(3);
  
    // console.log('Final Table: ', outputTable);
    outputTable.print();
  
    consolidatedObj.services = [];
  
    outputTable.data.forEach((row) => {
      const outputObj = {};
      outputObj.service = row[0];
      outputObj.status = 'good';
      outputObj.load = `${row[1].toFixed(2)  }`;
      outputObj.response_time = row[2].toFixed(2);
      // hardcode 0 as the error given that this is part of the catch block 
      outputObj.error = 0;
      outputObj.availability = row[3];
  
      consolidatedObj.services.push(outputObj);
    });
  }

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
  consolidatedObj.aggregate.load = `${(totalRequests / STREAM_WINDOW).toFixed(2) }`;
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

      const latencyDFMethod = dfGroupMethod.col(['cycleDuration']).mean();

      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: latencyDFMethod,
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

      console.log('Final Table: ', outputTableMethod);
      outputTableMethod.print();

      outputTableMethod.data.forEach((row, i) => {
        console.log('ROW', row)
        consolidatedObj.services[i].byMethod = {};
        consolidatedObj.services[i].byMethod.method = row[0];
        consolidatedObj.services[i].byMethod.status = 'good';
        consolidatedObj.services[i].byMethod.load = `${row[1].toFixed(2)  }hpm`;
        consolidatedObj.services[i].byMethod.response_time = row[2];
        consolidatedObj.services[i].byMethod.error = row[3];
        consolidatedObj.services[i].byMethod.availability = row[4];
      });

      console.log('FINAL OBJECT', consolidatedObj);
    } catch (e) {
      finalTableMethod = dfNewMethod;

      const latencyDFMethod = dfGroupMethod.col(['cycleDuration']).mean();

      finalTableMethod = dfd.merge({
        left: finalTableMethod,
        right: latencyDFMethod,
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

      console.log('Final Table: ', outputTableMethod);
      outputTableMethod.print();

      outputTableMethod.data.forEach((row, i) => {
        console.log('ROW', row)
        consolidatedObj.services[i].byMethod = {};
        consolidatedObj.services[i].byMethod.method = row[0];
        consolidatedObj.services[i].byMethod.status = 'good';
        consolidatedObj.services[i].byMethod.load = `${Math.round(row[1].toFixed(2))  }hpm`;
        consolidatedObj.services[i].byMethod.response_time = Math.round(row[2]);
        consolidatedObj.services[i].byMethod.error = 0;
        consolidatedObj.services[i].byMethod.availability = row[4];
      });

      // console.log('FINAL OBJECT', consolidatedObj);
    }
  });
  // console.log(JSON.stringify(consolidatedObj));
  console.log(consolidatedObj.services[0].byMethod);
  return JSON.stringify(consolidatedObj);
};

rtData(responseData); 
exports.rtData = rtData; 

