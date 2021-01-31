/* eslint-disable quote-props */
// This line must come before importing any instrumented module.
// const tracer = require('dd-trace').init();

const axios = require("axios");
const express = require("express");
// info for global-request-logger: https://www.npmjs.com/package/global-request-logger
// logs requests & responses
const globalLog = require("global-request-logger");
globalLog.initialize();

const bodyParser = require("body-parser");

// morgan.token('id', (req) => req);

const app = express();
const path = require("path");

const venus = require('./wrapper');
venus();

//#region 



// import moesif module
// const moesif = require("moesif-nodejs");
// const { nextTick } = require("process");
// // // set moesif options (only required field is applicationId)
// const moesifOpts = {
//   applicationId:
//     "eyJhcHAiOiIxOTg6NzE5IiwidmVyIjoiMi4wIiwib3JnIjoiODg6MTI2MCIsImlhdCI6MTYwOTQ1OTIwMH0.q4UAPiTNgEZf6DAq8clvuZ4U-sJYc3K_o9hJw8p5LYY",
//   logBody: true,
//   identifyUser: (req, res) => (req.user ? req.user.id : undefined),
// };
// // initialize middleware object with options
// const moesifMware = moesif(moesifOpts);
// moesifMware.startCaptureOutgoing();


// const ogHttpReq = http.request;
// http.request = (req) => {
//   console.log('HOOKED', req.host, req.body);
//   return ogHttpReq.apply(this, arguments);
// };

// const ogHttpsReq = https.request;
// https.request = (req, cb) => {
//   console.log('HOOKED', req, JSON.stringify(cb));
//   return ogHttpsReq.apply(this, cb);
// };

// const { performance, PerformanceObserver } = require("perf_hooks");
// const async_hooks = require('async_hooks')

// const cache = new Map()

// const hook = async_hooks.createHook({
//   init(id, type, trigger, resource) {
//     if (type === 'HTTPCLIENTREQUEST') {
//       console.log('HOOK CAUGHT!');
//       cache.set(id, resource)
//       performance.mark(`${id} - Start`);
//     }
//   },
//   after(id) {
//     if (cache.has(id)) {
//       const data = cache.get(id)
//       performance.mark(`${id} - End`);
//       performance.measure(data.req.res.responseUrl, `${id} - Start`, `${id} - End`)
//     }
//   },
// });

// const observer = new PerformanceObserver((list, obs) => {
//   list.getEntries().forEach((entry) => console.log(entry));
// });

// observer.observe({ entryTypes: ['measure'], buffer: true });

// function reqLogger(httpsMod) {
//   // console.log('reqLogger invoked!')
//   const ogRequest = httpsMod.request;
//   console.log("OG REQUEST", "" + ogRequest);
//   httpsMod.request = function (options, (res) => {
//     console.log("WE GOT A RESPONSE!!", res)
//     performance.mark(`${options.hostname} - End`);
//     });
//   performance.mark(`${options.hostname} - Start`);
//     performance.measure(`${options.hostname}`, `${options.hostname} - Start`, `${options.hostname} - End`);
//     performance.clearMarks();
//     // observer.disconnect();
//     return res;
//   }

// reqLogger(require("https"));
    
    // hook.enable()
    
    
    
    
    
    // hook.disable();
  
  
// when buffered is set to false, callback is invoked after each entry instance
  
  
  
    // console.log(options)
    
  



// Import the datadog apm tracing lib
// const datadogTracer = require("dd-trace").init({
//   analytics: true,
// });

// Import the express-opentracing lib
// const OpenTracingMiddleware = require("express-opentracing").default;
// app.use(OpenTracingMiddleware({ tracer: datadogTracer }));

// Enable the express-opentracing with datadog apm

// app.use(morgan(' :id :method :url :response-time'));
// app.use(morgan('combined'));
//#endregion


app.use(express.static(path.join(__dirname, '../test-client/'))); //serves the index.html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(moesifMware);

// declare responseTime middleware
// app.use(responseTime((req, res, time) => {
//   console.log(`${req.method} ${req.url} ${time}`);
// }))


 
// function msgSend (req, res, next) {
//   console.log('msgSend working')
//   axios("https://curriculum-api.codesmith.io/messages")
//     .then((response) => {
//       res.locals = response.json();
//     });
//     return next();
// }






app.get("/chat", (req, res) => {
  axios("https://curriculum-api.codesmith.io/messages/")
    // .then(res => console.log('GET RES', res.config.url))
    .then((response) => res.status(200).json(response.data));
});

app.post("/chat", (req, res) => {
  const { created_by, message } = req.body;
  axios
    .post("https://curriculum-api.codesmith.io/messages", {
      created_by,
      message,
    })
    // .then(axiosRes => axiosRes.url)
    // .then(data => console.log(data))
    .then(res.sendStatus(200))
    .catch((err) => console.error("POST ERROR", err));
});

// HAS to go after middleware
// app.use(connect_datadog);

// PORT is 8126 for purposes of testing datadog
const PORT = 8126;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 
