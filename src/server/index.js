const express = require('express'); 
const socket = require('socket.io'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const data = require('./real-time-data-analysis.js'); 
const redis = require('./real-time-read-handler.js'); 

const SOCKET_PORT = 8080; 
const EC2_HOST = process.env.EC2_HOST; 


const responseData = [
  {
    reqMethod: 'GET',
    reqHost: 'curriculum-api.codesmith.io',
    reqPath: '/messages',
    reqUrl: 'https://curriculum-api.codesmith.io/messages',
    resStatusCode: 200,
    cycleDuration: 1232,
    resMessage: 'OK',
  },
  {
    reqMethod: 'POST',
    reqHost: 'curriculum-api.codesmith.io',
    reqPath: '/messages',
    reqUrl: 'https://curriculum-api.codesmith.io/messages',
    resStatusCode: 400,
    cycleDuration: 1300,
    resMessage: 'OK',
  },
  {
    reqMethod: 'GET',
    reqHost: 'finance.yahoo.com',
    reqPath: '/TSLA',
    reqUrl: 'https://finance.yahoo.com/TSLA',
    resStatusCode: 400,
    cycleDuration: 1500,
    resMessage: 'OK',
  },
  {
    reqMethod: 'DELETE',
    reqHost: 'finance.yahoo.com',
    reqPath: '/AAPL',
    reqUrl: 'https://finance.yahoo.com/AAPL',
    resStatusCode: 200,
    cycleDuration: 1335,
    resMessage: 'OK',
  },
  {
    reqMethod: 'GET',
    reqHost: 'weather.google.com',
    reqPath: '/California/LA',
    reqUrl: 'https://weather.google.com/California/LA',
    resStatusCode: 200,
    cycleDuration: 1200,
    resMessage: 'OK',
  },
  {
    reqMethod: 'PATCH',
    reqHost: 'weather.google.com',
    reqPath: '/California/SF',
    reqUrl: 'https://weather.google.com/California/SF',
    resStatusCode: NaN,
    cycleDuration: 1100,
    resMessage: 'OK',
  },
];


const app = express(); 
app.use(cors({origin: '*'})); 
app.use(bodyParser); 


const server = app.listen(SOCKET_PORT, EC2_HOST, () => {
  console.log(`Listening in ${SOCKET_PORT}`); 
}); 

const io = socket(server); 

io.sockets.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`); 
  sendData(socket); 
})

async function sendData(socket){

  const streamData = await redis.readRedisStream();
  const output = data.rtData(responseData); 
  socket.emit('real-time-object', output); 
  console.log(`Output is ${output}`); 

  setTimeout(() => {
    sendData(socket); 
  }, 3000); 
}

// const streamData = await redis.readRedisStream();

// const streamData = async () => {
//   const streamOutput =  await redis.readRedisStream();  
//   console.log('stream Data: ', streamOutput); 
//   const output = data.rtData(streamData);  
//   console.log(`Output is ${output}`); 
// }

// streamData(); 