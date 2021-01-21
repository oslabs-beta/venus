/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
  const df = new dfd.DataFrame(data);
  const uniqueHosts = df["reqHost"].unique().data;
  const output = {};
  uniqueHosts.forEach((host) => {
    output[host] = hostConstruct(host);
  });
  return output;


function hostConstruct(host) {
  const dataObj = {};
  // assign table with host-specific entries to constant
  const dfHost = df.query({ column: "reqHost", is: "==", to: host });
  dataObj.host = host;
  // total number of requests = entries in host table
  // const requests = dfHost.count({ axis: 1 }).size; //?

  // total requests
  dataObj.reqCount = dfHost["reqMethod"].count();
  // console.log(reqCount);

  // total responses
  dataObj.resCount = dfHost["resStatusCode"].count();
  // console.log(resCount);

  // successful responses = query values in resStatusCode column < 400.
  // Number of rows = number of entries that match the query
  dataObj.successRes = 0;

  // dfHost['resStatusCode'].apply(n => {
  //   if (Number(n) < 400) dataObj.successRess++;
  // });

  const codes = dfHost["resStatusCode"].values; //?
  // console.log(codes);
  codes.forEach((code) =>
    code < 400 ? dataObj.successRes++ : dataObj.successRes
  );

  // calculate availability (aka uptime) responses received / requests sent
  dataObj.availability = (dataObj.resCount / dataObj.reqCount) * 100 + "%";

  // calculate successRate -> responses with status code < 400 / total responses
  dataObj.successRate = (dataObj.successRes / dataObj.resCount) * 100 + "%";

  // calculate average cycle duration by indexing into cycleDuration column and invoking mean method
  // axis-->column
  dataObj.avgDuration = dfHost[`cycleDuration`].mean(1);
  // console.log(dataObj.avgDuration);

  // empty object which will contain {method:count} key:vals for each request method
  const reqMethodCount = {
    GET: 0,
    POST: 0,
    PUT: 0,
    DELETE: 0,
    PATCH: 0,
  };

  // increment each respective reqMethodCount property by iterating thru reqMethod column
  dfHost["reqMethod"].apply((method) => reqMethodCount[method]++);
  // console.log(dataObj.reqMethodCount);

  // calculate request method percentage breakdown
  dataObj.reqMethodBreakdown = {
    GET: (reqMethodCount.GET / dataObj.resCount) * 100 + "%",
    POST: (reqMethodCount.POST / dataObj.resCount) * 100 + "%",
    PUT: (reqMethodCount.PUT / dataObj.resCount) * 100 + "%",
    DELETE: (reqMethodCount.DELETE / dataObj.resCount) * 100 + "%",
    PATCH: (reqMethodCount.PATCH / dataObj.resCount) * 100 + "%",
  };

  // console.log(dataObj.reqMethodBreakdown);
  dataObj.paths = dfHost["reqPath"].unique().data;
  dataObj.pathData = {};
  // dataObj.paths.forEach((path) => {
  //   dataObj.pathData[path] = pathConstruct(path);
  // });
  return dataObj;
}
};

//#region
// const pathConstruct = (path) => {
//   const dataObj = {};
//   // assign table with host-specific entries to constant
//   const dfHost = df.query({ column: "reqPath", is: "==", to: path });
//   // dfHost.print();
//   dataObj.path = path;
//   // total number of requests = entries in host table
//   // const requests = dfHost.count({ axis: 1 }).size; //?
//   // dfHost.print();

//   // total requests
//   dataObj.reqCount = dfHost["reqMethod"].count();
//   // console.log(reqCount);

//   // total responses
//   dataObj.resCount = dfHost["resStatusCode"].count();
//   // console.log(resCount);

//   // successful responses = query values in resStatusCode column < 400.
//   // Number of rows = number of entries that match the query
//   dataObj.successRes = 0;
//   const codes = dfHost["resStatusCode"].values;
//   codes.forEach((code) =>
//     code < 400 ? dataObj.successRes++ : dataObj.successRes
//   );
//   // dfHost.query({ column: 'resStatusCode', is: '<', to: 400 }).shape[0];

//   // calculate availability (aka uptime) responses received / requests sent
//   dataObj.availability = (dataObj.resCount / dataObj.reqCount) * 100 + "%";

//   // calculate successRate -> responses with status code < 400 / total responses
//   dataObj.successRate = (dataObj.successRes / dataObj.resCount) * 100 + "%";

//   // calculate average cycle duration by indexing into cycleDuration column and invoking mean method
//   // axis-->column
//   dataObj.avgDuration = dfHost[`cycleDuration`].mean(1);
//   // console.log(dataObj.avgDuration);

//   // empty object which will contain {method:count} key:vals for each request method
//   const reqMethodCount = {
//     GET: 0,
//     POST: 0,
//     PUT: 0,
//     DELETE: 0,
//     PATCH: 0,
//   };

//   // increment each respective reqMethodCount property by iterating thru reqMethod column
//   dfHost["reqMethod"].apply((method) => reqMethodCount[method]++);
//   // console.log(dataObj.reqMethodCount);

//   // calculate request method percentage breakdown
//   dataObj.reqMethodBreakdown = {
//     GET: (reqMethodCount.GET / dataObj.resCount) * 100 + "%",
//     POST: (reqMethodCount.POST / dataObj.resCount) * 100 + "%",
//     PUT: (reqMethodCount.PUT / dataObj.resCount) * 100 + "%",
//     DELETE: (reqMethodCount.DELETE / dataObj.resCount) * 100 + "%",
//     PATCH: (reqMethodCount.PATCH / dataObj.resCount) * 100 + "%",
//   };

//   // console.log(dataObj.reqMethodBreakdown);

//   return dataObj;
// };
//#endregion

// add column for hierarchy array
const pathHierarchy = (dataFrame) => {
  // TODO better way to count rows
  const rows = dataFrame["reqMethod"].count(); //?
  let hierarchyIncrCol = [];
  let hierarchySeparateCol = [];
  const rowDataInternal = {};
  const rowDataExternal = {};

  for (let i = 0; i < rows; i++) {
    let hierarchyIncr = [];
    let hierarchySeparate = [];
    const row = dataFrame.loc({ rows: [i] });
    const host = row["reqHost"].data[0]; //?
    hierarchyIncr.push(host);
    hierarchySeparate.push(host);
    let fullPath = dataFrame.loc({ rows: [i] })["reqPath"].data[0];
    // console.log(fullPath);
    if (!PATH_BREAKDOWN) hierarchyIncr.push(fullPath);
    else {
      let pathArr = fullPath.split("/");
      let pathStr = `${host}`;
      for (let path of pathArr) {
        if (path.length > 0) {
          pathStr += "/" + path;
          hierarchyIncr.push(pathStr);
          hierarchySeparate.push("/" + path);
        }
      }
    }
    // console.log(hierarchy);
    hierarchyIncrCol.push(hierarchyIncr);
    hierarchySeparateCol.push(hierarchySeparate);
  }
  dataFrame.addColumn({
    column: "hierarchyIncr",
    value: hierarchyIncrCol,
  });
  dataFrame.addColumn({
    column: "hierarchySeparate",
    value: hierarchySeparateCol,
  });
  return dataFrame;
};

const outputData = rtData(responseData);
console.log(outputData);

//#region
//   for (const path of hierarchyIncr) {
//     if (!rowDataInternal[path]) rowDataInternal[path] = {};
//     if (!rowDataInternal[path].reqMethod)
//       rowDataInternal[path].reqMethod = {};
//     const method = row["reqMethod"].values[0];
//     rowDataInternal[path].reqMethod[method] =
//       (rowDataInternal[path].reqMethod[method] || 0) + 1;

//     rowDataInternal[path].reqCount =
//       (rowDataInternal[path].reqCount || 0) + 1;
//     // rowDataExternal[path].reqCount = rowDataInternal[path].reqCount;
//     if (row["resCount"] !== NaN) {
//       rowDataInternal[path].resCount =
//         (rowDataInternal[path].resCount || 0) + 1;
//       // rowDataExternal[path].availability = rowDataInternal[path].resCount / rowDataInternal[path].reqCount * 100 + '%';
//     }
//     if (row["resStatusCode"].values[0] < 400) {
//       rowDataInternal[path].successRes =
//         (rowDataInternal[path].successRes || 0) + 1;
//       // rowDataExternal[path].successRate = rowDataInternal[path].successRes / rowDataInternal[path].resCount * 100 + '%';
//     }
//     // console.log('DURATION', row['cycleDuration'].data[0]);
//     // if (!rowDataInternal[path].duration) rowDataInternal[path].duration = [];
//     rowDataInternal[path].duration = (
//       rowDataInternal[path].duration || []
//     ).concat(row["cycleDuration"].data);
//     // rowDataExternal[path].avgDuration = rowDataInternal[path].duration.mean();
//   }
//   // console.log('INTERNAL DATA', rowDataInternal);
//   // console.log(hierarchySeparate);
// };

// for (const endpoint in rowDataInternal) {
//   const data = rowDataInternal[endpoint];
//   rowDataExternal[endpoint] = {};
//   rowDataExternal[endpoint].reqMethod = {};
//   for (const method in rowDataInternal[endpoint].reqMethod) {
//     rowDataExternal[endpoint].reqMethod[method] =
//       (rowDataInternal[endpoint].reqMethod[method] / data.reqCount) * 100 +
//       "%";
//   }
//   rowDataExternal[endpoint].reqCount = data.reqCount;
//   rowDataExternal[endpoint].availability =
//     (data.resCount / data.reqCount) * 100 + "%";
//   rowDataExternal[endpoint].successRate = data.successRes
//     ? (data.successRes / data.resCount) * 100 + "%"
//     : "0%";
//   rowDataExternal[endpoint].avgDuration =
//     data.duration.reduce((sum, val) => (sum += val)) / data.duration.length; //?
// }
//#endregion



