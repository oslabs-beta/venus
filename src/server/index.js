const express = require('express')
const socket = require('socket.io'); 
const bodyParser = require('body-parser'); 
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
app.use(bodyParser); 



require('dotenv').config(); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





