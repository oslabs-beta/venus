const express = require('express'); 
const socket = require('socket.io'); 
const cors = require('cors'); 

const app = express(); 
const HTTP_PORT = 3000; 

const data = require('./data_analysis/rt-data.js'); 
const { constructHistorical, main, writeToDB } = require('./data_analysis/historical-data-analysis.js'); 
const redis = require('./redis_handlers/real-time-read-handler.js'); 
const authController = require('./controller.js')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: '*'})); 

require('dotenv').config(); 

const SOCKET_PORT = 8080; 
const EC2_HOST = process.env.EC2_HOST; 
// const EC2_HOST = config.get('EC2_HOST'); 
let COUNT = 0; 
let BUFFER = []; 

//Trigger historical writes in database
main(); 

/**
 * JWT token logic
 */
const jwt = require('jsonwebtoken');
// jwt ACCESS token lifetime (in MINUTES)
const access_token_lifetime = 5;

// jwt REFRESH token lifetime (in HOURS)
const refresh_token_lifetime = 24;

// FIXME store as environment variables
let SERVER_IP = 'testserver'
let ACCESS_SECRET = 'Wa29*#B6H^n'
let REFRESH_SECRET = 'g#RD4dXaQH54'
let REFRESH_TOKEN_STORED;

const server = app.listen(SOCKET_PORT, EC2_HOST, () => {
  console.log(`Listening in ${SOCKET_PORT}`); 
}); 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const io = socket(server); 

/**
 * socket.io "global handler" 
 * At this point in the flow, a JWT access token has already been generated and stored in localStorage.
 * This function verifies that the accessToken has been provided and subsequently verifies it.
 */
io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.accessToken) {
      console.log('SUCCESSFUL TOKEN HANDSHAKE')
      jwt.verify(socket.handshake.query.accessToken, ACCESS_SECRET, (err, decoded) => {
        console.log('VERIFIED!')
        if (err) return next(new Error('Token authentication error!'))
        // socket.emit('')
        socket.emit('connection', 'connected!'); 
        socket.decoded = decoded;
        return next();
      });
    } else {
      return next(new Error('Token authentication error!'))
    }
})

io.sockets.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`); 
  sendData(socket); 
})

async function sendData(socket){
  //Increment count everytime sendData is invoked. 
  COUNT++; 
  console.log('COUNT:', COUNT); 
  console.log('BUFFER:', BUFFER); 
  
//Read last three minutes of log data from stream and store into an array of objects
  const streamData = await redis.readRedisStream();
  
  if(streamData.length !== 0){
    //Analyze last three minutes of stream data and store output of analysis
    const output = data.rtData(streamData);
    console.log('EMITTING VIA SOCKET'); 
    //Emit output to the front-end via websocket
    socket.emit('real-time-object', output); 
    
    if(COUNT === 10){
      //add output to buffer
      BUFFER.push(output[0]); 
      //Reset count to be zero
      COUNT = 0; 
      
      if(BUFFER.length === 5){
        
        console.log('WRITE TO DB TRIGGERED!'); 

        //pass buffer into historical data analysis
        writeToDB(BUFFER); 
        
        //empty buffer
        BUFFER = []; 
      }
    }
    
  } else {

    if(COUNT === 60){
      COUNT = 0; 
    }
    
    console.log('No usable data from the stream. ')
  }
  
  setTimeout(() => {
    sendData(socket); 
  }, 3000); 
}


/**
 * EXPRESS ROUTES
 */

 /** handler for login request
 * will check against serverIP and secret environment variables
 * if it's a match, will generate an access token and a refresh token
 */
app.post('/login', (req, res) => {
  console.log('LOGIN BODY', req.body);
  console.log('ENV DATA', {
    serverAddress: `${EC2_HOST}:${HTTP_PORT}`,
    secret: ACCESS_SECRET,
  });
  const { serverAddress, secret } = req.body;
  // check against environment variables
  if (
    serverAddress === `http://${EC2_HOST}`
    && secret === ACCESS_SECRET
  ) {
    console.log('ADDRESS AND SECRET MATCH')
    // generate ACCESS token
    const accessToken = jwt.sign(
      {
        serverAddress,
      },
      secret,
      {
        expiresIn: access_token_lifetime * 60,
      },
    );

    // generate REFRESH token
    const refreshToken = jwt.sign(
      {
        serverAddress,
      },
      REFRESH_SECRET,
      {
        // 3600 = seconds in 1 hour
        expiresIn: refresh_token_lifetime * 3600,
      },
    );
    // FIXME update logic
    REFRESH_TOKEN_STORED = refreshToken;
    console.log('ACCESS TOKEN', accessToken)
    console.log('REFRESH TOKEN', refreshToken)
    console.log('REFRESH TOKEN STORED', REFRESH_TOKEN_STORED)
    return res.json({
      accessToken,
      refreshToken,
    });
  }
  res.status(403).send('Incorrect credentials');
});

/**
 * Refresh token handler
 * Ensures that refreshToken is included in request body. If so, verifies against secret and generates a new
 * Access token.
 */
app.post('/refresh_token', (req, res) => {
  console.log('REFRESH TOKEN HANDLER INVOKED')
  const { refreshToken } = req.body;
  // check if refreshToken was included in body
  if (!refreshToken) {
    return res.sendStatus(401).json({
      error: 'Access denied! Missing token...',
    });
  }
  // query cache to ensure that token is valid
  if (refreshToken !== REFRESH_TOKEN_STORED) {
    return res.status(403).json({
      error: 'Token expired!',
    });
  }
  // extract payload from refresh token and generate new access token
  const payload = jwt.verify(REFRESH_TOKEN_STORED, REFRESH_SECRET);
  const accessToken = jwt.sign(
    {
      serverAddress: payload,
    },
    ACCESS_SECRET,
    {
      expiresIn: access_token_lifetime * 60,
    },
    // FIXME take this line out
    (err, token) => console.error(`access token successfully created ${token}`),
  );
  return res.json({ accessToken });
});


app.get('/getHistorical', 
  authController.verify,
  (req, res) => {
    const { service } = req.body; 
    const output = constructHistorical(service); 
    return res.json(output); 
})


app.listen(HTTP_PORT, () => {
  console.log(`HTTP requests listening on port ${HTTP_PORT}`)
})