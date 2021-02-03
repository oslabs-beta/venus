/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable max-len */
const http = require("http");
const https = require("https");
const { PerformanceObserver } = require("perf_hooks");
require("dotenv").config();
const config = require("config");
const redisStream = require("./redis-stream");

const { clientErrCodes, serverErrCodes } = require("../config/errCode_Config");

/**
 * Monkey patch 'http' / 'https' modules to track relevant properties of the request / response objects
 * without modifying the original events
 */
function venus() {
  /**
   * override() invokes `http` and 'https' modules separately in order to ensure that URL's with both protocols are logged
   */
  override(http);
  override(https);
}

function override(module) {
  /**
   * Reference to original request method.
   */
  const original = module.request;

  /**
   * Will store all the relevant properties of req/res objects before writing to Redis stream.
   */
  const fullLog = {};

  /**
   * Boolean will be set to true if request url is acceptable based on config file.
   * If boolean continues to be false, the fullLog object won't be written to the Redis stream
   */
  let endpointMatch = false;

  /**
   * PerformanceObserver interface is used to observe performance measurement events and be notified
   * of new performance entries as they are recorded in the browser's performance timeline
   *
   * In this case -- it is primarily used to track the duration of the request/response cycle
   */

  const perfObserver = new PerformanceObserver((items) => {
    /**
     * PerformanceObserver instance will only track one http module invokation at a time.
     * endpointMatch conditional insures that only relevant http requests are updated
     * with the cycleDuration property and written to Redis stream.
     */

    const perfEntry = items.getEntries()[0];
    if (endpointMatch) {
      fullLog.cycleDuration = perfEntry.duration;
      return redisStream.writeRedisStream(redisStream.streamName, fullLog);
    }
  });

  /**
   * Subscribes the PerformanceObserver instance to notifications of new PerformanceEntry instances,
   * specifically matching the 'http' type
   */

  perfObserver.observe({
    entryTypes: ["http"],
  });

  /**
   * @param outgoing - original request object
   * updates fullLog object with relevant properties of the request object
   * returns original request by invoking the .apply() method
   */

  function wrapper(outgoing) {
    /**
     * Store request call with original arguments and execution context.
     */
    const req = original.apply(this, arguments);

    /**
     * Store original request event emitter.
     */
    const { emit } = req;

    /**
     * Modify request event emitter by adding a listener to the end of the response event.
     * The listener is only invoked if the boolean is true (request URL is within configuration scope)
     * If the response object includes a statusCode value that is categorized as a clientError or serverError
     * (as configured in errCode_Config.js), cycleDuration is hardcoded as NaN given that the PerformanceObserver
     * will not register a response end, the function returns an invokation of the redisStream write logic
     * Depending on statusCode, the appropriate property (clientError, serverError, noError) is given a value of 1
     * for the purposes of later calculation (see rt-data-helperFunctions.js)
     */
    req.emit = function (eventName, response) {
      switch (eventName) {
      case "response": {
        if (endpointMatch) {
          const statusCode = response.statusCode || 404;
          fullLog.resStatusCode = statusCode;
          if (clientErrCodes[statusCode]) {
            fullLog.clientError = 1;
            fullLog.serverError = 0;
            fullLog.noError = 0;
            fullLog.resMessage = response.statusMessage || "No message";
            fullLog.cycleDuration = NaN;
            return redisStream.writeRedisStream(
              redisStream.streamName,
              fullLog,
            );
          }
          if (serverErrCodes[statusCode]) {
            fullLog.clientError = 0;
            fullLog.serverError = 1;
            fullLog.noError = 0;
            fullLog.resMessage = response.statusMessage || "No message";
            fullLog.cycleDuration = NaN;
            return redisStream.writeRedisStream(
              redisStream.streamName,
              fullLog
            );
          }
          fullLog.clientError = 0;
          fullLog.serverError = 0;
          fullLog.noError = 1;
          fullLog.resMessage = response.statusMessage || "No message";
        }
      }
      }
      
      /* emit the original event */  
      return emit.apply(this, arguments);
    };
    reqLogger(outgoing);
    
    /* return the original request object */
    return req;
  }


  /**
   * request object logger function
   * @param req: request object
   * reqUrl is either the value of a nested property in the request object
   * or can be constructed with `protocol` + `//` + `hostname` + `path`
   * */

  function reqLogger(req) {
    const reqUrl = req.uri
      ? req.uri.Url.href
      : `${req.protocol}//${req.host || req.hostname}${req.path}`;
    /**
     * endpoints to be EXCLUDED based on configuration file, otherwise all are included by default
     */
    fullLog.reqHost = req.host || req.hostname;
    const endpoints = config.get("venus.endpointsExcluded");
    // FIXME take out timestamp 
    if (endpoints[fullLog.reqHost] || endpoints[reqUrl]) {
      endpointMatch = false;
      return false;
    }
    fullLog.reqMethod = req.method || 'GET';
    fullLog.reqPath = req.pathname || req.path || "/";
    fullLog.reqUrl = reqUrl;
    endpointMatch = true;
    return true;
  }
  /**
   * assign new wrapper function to the request object
   */
  module.request = wrapper;
}

module.exports = venus;
