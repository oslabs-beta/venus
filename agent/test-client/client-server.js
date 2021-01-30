/* eslint-disable import/newline-after-import */
/* eslint-disable quote-props */
// This line must come before importing any instrumented module.
// const tracer = require('dd-trace').init();

const axios = require('axios');
const express = require('express');

const app = express();
const path = require('path');

/** VENUS AGENT */
const venus = require('../wrapper/wrapper');
venus();


app.use(express.static(path.join(__dirname, './'))); //serves the index.html

app.get('/chat', (req, res) => {
  axios('https://curriculum-api.codesmith.io/messagez/')
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
    .then(res.sendStatus(200))
    .catch((err) => console.error('POST ERROR', err));
});

const PORT = 8126;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
