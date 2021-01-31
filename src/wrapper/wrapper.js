/* eslint-disable default-case */
/* eslint-disable max-len */
const http = require('http');
const https = require('https');
const { PerformanceObserver } = require('perf_hooks');
require('dotenv').config();
const config = require('config');
const redisStream = require('./redis-stream');




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
      console.log(fullLog);
      return redisStream.writeRedisStream(redisStream.streamName, fullLog);
    }
  });

  /**
   * Subscribes the PerformanceObserver instance to notifications of new PerformanceEntry instances, 
   * specifically matching the 'http' type
   */ 
  perfObserver.observe({ 
    entryTypes: ['http'], 
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
     */
    req.emit = function (eventName, response) {
      switch (eventName) {
      case 'response': {
        if (endpointMatch) {
          response.on('end', () => {
            fullLog.resStatusCode = response.statusCode;
            fullLog.resMessage = response.statusMessage;
          });
        }
      }
      }
      
      /**
       * Return the event emitter with original argument and execution context.
       */
      return emit.apply(this, arguments);
    };
    
    /**
     * return the original request object
     */ 
    logger(outgoing);
    return req;
  }

  /**
   * @param req: request object
   * reqUrl is either the value of a nested property in the request object 
   * or can be constructed with `protocol` + `//` + `hostname` + `path`
   * */ 
  function logger(req) {
    const reqUrl = req.uri
      ? req.uri.Url.href
      : `${req.protocol}//${req.host || req.hostname}${req.path}`;
    /**
     * endpoints to be EXCLUDED based on configuration file, otherwise all are included by default 
     */
    const endpoints = config.get('venus.endpoints');
    if (endpoints[reqUrl]) return false;
    fullLog.reqMethod = req.method || 'GET';
    fullLog.reqHost = req.host || req.hostname || 'locahost';
    fullLog.reqPath = req.pathname || req.path || '/';
    fullLog.reqUrl = reqUrl;
    endpointMatch = true;
    return true;
  }
  
  /**
   * update request object with the updated wrapper function
   */
  module.request = wrapper;
}

module.exports = venus;






