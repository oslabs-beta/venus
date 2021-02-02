const express = require('express')
const socket = require('socket.io'); 
// const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express()
const port = 3000

const data = require('./data_analysis/rt-data.js'); 
const { constructHistorical, main, writeToDB } = require('./data_analysis/historical-data-analysis.js'); 
const redis = require('./redis_handlers/real-time-read-handler.js'); 
const authController = require('./controller.js')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: '*'})); 
// app.use(bodyParser); 



require('dotenv').config(); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// const io = socket(server); 

/**
 * socket.io "global handler" 
 * At this point in the flow, a JWT access token has already been generated and stored in localStorage.
 * This function verifies that the accessToken has been provided and subsequently verifies it.
 */
// io.use(function (socket, next) {
//   if (socket.handshake.query && socket.handshake.query.accessToken) {
//       console.log('SUCCESSFUL TOKEN HANDSHAKE')
//       jwt.verify(socket.handshake.query.accessToken, ACCESS_SECRET, (err, decoded) => {
//         if (err) return next(new Error('Token authentication error!'))
//         socket.emit('')
//         socket.decoded = decoded;
//         return next();
//       });
//     } else {
//       return next(new Error('Token authentication error!'))
//     }
// })

// io.sockets.on('connection', (socket) => {
//   console.log(`New connection: ${socket.id}`); 
//   sendData(socket); 
// })







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





