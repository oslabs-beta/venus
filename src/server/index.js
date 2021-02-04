/* 
  * Require Statements
  * The server function requires express, socket.io and functionality from the redis read handler, 
  * historical data analyzer and authentication controller. 
*/
const express = require('express'); 
const socket = require('socket.io'); 
const uuid = require('uuid-random');
const cors = require('cors'); 
const data = require('./data_analysis/rt-data.js'); 
const jwt = require('jsonwebtoken');
const redis = require('./redis_handlers/real-time-read-handler.js'); 
const { histMain, writeToDB, histController, readAll } = require('./data_analysis/historical-data-analysis.js'); 
const authController = require('./controllers/authController.js')
require('dotenv').config(); 


/* 
  * Global Middleware Functions & Port Declarations
  * HTTP & Sockets will communicate via different ports defined by the user on their EC2 instance and should be defined in the .env file. 
  * All HTTP requests will pass through a json parser, urlencoding mechanism and will be cors compatible.  
*/
const HTTP_PORT = process.env.HTTP_PORT; 
const SOCKET_PORT = process.env.SOCKET_PORT; 
const EC2_HOST = process.env.EC2_HOST; 

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: '*'})); 


/* 
  * Buffering Mechanism for Writing to Historical Analysis
  * Count here serves as a way to disperse the rate at which logs are added to the Buffer array, 
  * which when full, is then passed onto the writeToDB function to be then processed and analyzed.  
*/
let COUNT = 0; 
let BUFFER = []; 

/* 
  * Historical Main Function To Trigger Cascading Writes
  * This function triggers the series of setTimeout functions in the historical-data-analysis file that 
  * write to the series of tables Venus uses to have pre-calculated data points to serve onto the front-end. 
*/
histMain(); 
readAll(); 
// readLastHour('curriculum-api.codesmith.io'); 
// constructHistorical('aggregate');
// constructHistorical('curriculum-api.codesmith.io');


/* 
 * JWT access token will have a 24 hour lifetime,
 * given the additional security layer that will be inherently provided by EC2
 */
// jwt ACCESS token lifetime (in HOURS)
const access_token_lifetime = 24;

/** 
 *  JWT token initialization.
 *  The initial user can either store the access token secret as an environment variable or
 *  auto-generate one. 
 */
process.env.ACCESS_SECRET = process.env.ACCESS_SECRET || uuuid();

/**
 * Token lifetime (in HOURS) will be saved as an environment variable.
 * The access token will have a 24 hour lifetime by default but can be adjuted by the user as needed. 
 */
process.env.ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || 24;

/* SOCKET SERVER - Strictly for the socket connection between the real-time dashboard and the real-time data analysis. */
const server = app.listen(SOCKET_PORT, EC2_HOST, () => {
  console.log(`Listening in ${SOCKET_PORT}`); 
}); 

const io = socket(server); 


/* Socket.io handler includes a token verification layer before establishing a socket connection */
io.use(function (socket, next) {
  // if (socket.handshake.query && socket.handshake.query.accessToken) {
  //     jwt.verify(socket.handshake.query.accessToken, 
  //       process.env.ACCESS_SECRET, 
  //       (err, decoded) => {
  //         if (err) return next(new Error('Token authentication error!'))
          socket.emit('connection', 'connected!'); 
          return next();
      //   });
      // } return next(new Error('Token expired!'))
});

io.sockets.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`); 
  emitData(socket); 
})


/**
 * Emit Data Function 
 * This function's primarily role is to, upon socket connection, run the real-time data analysis and emit the result to 
 * the front-end.
 */
async function emitData(socket){
  
  //Read last three minutes of log data from stream and store into an array of objects.
  const streamData = await redis.readRedisStream();
  
  //Logic should only trigger if a valid response is received from the redis read handler.
  if(streamData.length !== 0){
    
    //Analyze last three minutes of stream data and store output of analysis.
    let output = data.rtData(streamData);

    console.log('EMITTING VIA SOCKET'); 
    
    //Emit output to the front-end via websocket,
    socket.emit('real-time-object', output); 
  }

  //Recursive call to trigger function every second. 
  setTimeout(() => {
    emitData(socket); 
  }, 3000); 
    
}


/**
 * Send Data Function 
 * This function's primarily role is to house all of the logic needed to buffer and send log data for historical data analysis, 
 * leveraging the COUNT and BUFFER variables declared above to write data at a pre-determined cadence.
 * 
 * In this example, the function triggers sendData every 3 seconds and adds to the Buffer array every 3 minutes, which then writes
 * to the "writeToDB" function passing the buffer off to the functions over in historical-data-analysis.js for further processing. 
 */
async function sendData(){
  //Increment count everytime sendData is invoked. 
  COUNT++; 

  console.log('COUNT: ', COUNT);
  console.log('BUFFER: ', BUFFER); 
  
  //Read last three minutes of log data from stream and store into an array of objects.
  const streamData = await redis.readRedisStream();
  
  //Logic should only trigger if a valid response is received from the redis read handler.
  if(streamData.length !== 0){
    
    //Analyze last three minutes of stream data and store output of analysis.
    let output = data.rtData(streamData);
    
    //When 1 minutes have passed (i.e. count is 20, since count only increments every 3 seconds), add to buffer. 
    if(COUNT % 20 === 0){
      
      //Add the log object to the buffer. 
      BUFFER.push(output[2]); 
      
      //Reset count for the next cycle. 
      COUNT = 0; 
      
      if(BUFFER.length === 5){
        
        console.log('WRITE TO DB TRIGGERED!'); 

      //Pass buffer into historical data analysis.
      writeToDB(BUFFER); 
        
      //Reset buffer for the next cycle.
      BUFFER = []; 
      }
    }
    
  } else {
    
    console.log('No usable data from the stream. ')
  }
  
  //Recursive call to trigger function every second. 
  setTimeout(() => {
    sendData(); 
  }, 3000); 
}

/* Trigger sendData once the instance is spun up. */
sendData(); 

/**
 * EXPRESS ROUTES
 */

 /** 
 * Route handler for login authentication request.
 * Will check against serverAddress and secret environment variables.
 * If varified, will generate and return to the desktop client a JWT access token
 */
app.post('/login', (req, res) => {
  const { serverAddress, secret } = req.body;
  if (
    serverAddress === `http://${EC2_HOST}`
    && secret === process.env.ACCESS_SECRET
  ) {
    const accessToken = jwt.sign(
      { 
        serverAddress 
      },
      secret,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME * 3600,
      },
    );
    return res.json(accessToken);
  }
  res.status(403).send('Incorrect credentials');
});

 /** 
 * Historical Chart Data Route Handler
 * This handler passes on the service the front-end is requesting data for and generates 
 * a historical data object that is then served back to the front-end for display. 
 */
app.get('/getHistorical/:service',
  histController.readLastHour,
  histController.readLastDay,
  histController.readLastWeek,
  histController.readLastMonth,
  (req, res) => {

    return res.json(res.locals.data); 

})


/* HTTP SERVER - This server delcaration is ONLY for HTTP requests and is separate from the Socket server. */
app.listen(HTTP_PORT, () => {
  console.log(`HTTP requests listening on port ${HTTP_PORT}`)
})