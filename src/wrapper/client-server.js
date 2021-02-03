/**
 * NOTE: THIS FILE IS FOR TESTING PURPOSES ONLY AND SHOULD BE REMOVED BEFORE FINAL SHIPPING
 */

const express = require("express");
const app = express();

const axios = require("axios");

/**
 * Venus agent will be required in and instantiated within the user's main server file 
 */
const venus = require('./wrapper');
venus();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/*
 * counter variable used to alternate between 
 * (1) a functional API GET request  
 * (2) a functional API POST request
 * (3) erroneous GET request
 * Randomized time interval between 0 and 10 seconds
 */ 
  
let counter = 1;
const testBodyObj = {
  created_by: "SmarterChild",
  message: "Hey, long time no speak!",
}
setInterval(() => {
  if (counter === 500) {
    axios.post('http://localhost:8126/chat', testBodyObj)
      .then(() => {
        counter = 0
      })
      .catch((err) => console.error(`Wrapper API Test Error: ${err}`))
  } else if (counter % 2 === 0) axios('http://localhost:8126/chat')
  else axios('http://localhost:8126/chatz')
  counter++
}, Math.random() * 10000);


/* Functional GET request */
app.get('/chat', (req, res) => {
  axios('https://curriculum-api.codesmith.io/messages/')
    .then((response) => res.status(200).json(response.data))
    .catch((err) => console.log(`Get error: ${err}`));
});

/* Erroneous GET request */
app.get('/chatz', (req, res) => {
  axios('https://curriculum-api.codesmith.io/messagez/')
    .then((response) => res.status(200).json(response.data))
    .catch((err) => console.log(`Get error: ${err}`));
});


/* Functional POST request */
app.post('/chat', (req, res) => {
  const { created_by, message } = req.body;
  axios
    .post('https://curriculum-api.codesmith.io/messages', {
      created_by,
      message,
    })
    .then(res.sendStatus(200))
    .catch((err) => console.error('POST ERROR', err));
});

const PORT = 8126;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));