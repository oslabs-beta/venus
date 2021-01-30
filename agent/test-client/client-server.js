/* eslint-disable quote-props */
// This line must come before importing any instrumented module.
// const tracer = require('dd-trace').init();

const axios = require('axios');
const express = require('express');
// const responseTime = require('response-time');
// const morgan = require('morgan');
const globalLog = require('global-request-logger');

globalLog.initialize();

const bodyParser = require('body-parser');

// morgan.token('id', (req) => req);

const app = express();
const path = require('path');

const venus = require('../wrapper/wrapper');

venus();


app.use(express.static(path.join(__dirname, './'))); //serves the index.html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/chat', (req, res) => {
  axios('https://curriculum-api.codesmith.io/messagez/')
    // .then(res => console.log('GET RES', res.config.url))
    .then((response) => res.status(200).json(response.data))
    .catch((err) => console.log(`Get error: ${err}`));
});

app.post('/chat', (req, res) => {
  const { created_by, message } = req.body;
  axios
    .post('https://curriculum-api.codesmith.io/messages', {
      created_by,
      message,
    })
    // .then(axiosRes => axiosRes.url)
    // .then(data => console.log(data))
    .then(res.sendStatus(200))
    .catch((err) => console.error('POST ERROR', err));
});

const PORT = 8126;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
