/* eslint-disable import/newline-after-import */
/* eslint-disable quote-props */
// This line must come before importing any instrumented module.
// const tracer = require('dd-trace').init();

const axios = require('axios');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');

/** VENUS AGENT */
const venus = require('../wrapper/wrapper');
venus();

const apiDB = {
  1: 'chat',
  2: 'starwars',
  3: 'bitcoin',
  4: 'cat',
  5: 'bored',
  6: 'universities',
  7: 'chatz',
};

let i = 1;
const messageBody = {
  created_by: 'SmarterChild',
  message: 'Hey! Long time no speak!',
};

setInterval(() => {
  if (i < 8) {
    console.log(`http://localhost:8126/${apiDB[i]}`);
    axios(`http://localhost:8126/${apiDB[i]}`)
      .then(() => {
        console.log('PUBLIC API SUCCESS');
      })
      .catch(err => console.log('PUBLIC API ERROR'));
    i++;
  } else {
    axios
      .post('http://localhost:8126/chat', messageBody)
      .then(() => {
        console.log('CODESMITH API SUCCESS');
      })
      .catch(err => console.log('CODESMITH API ERROR'));
    i = 1;
  }
  
}, Math.random() * 5000);

app.get('/chat', (req, res) => {
  axios('https://curriculum-api.codesmith.io/messages/')
    .then(response => res.status(200).json(response.data))
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});

app.post('/chat', (req, res) => {
  const { created_by, message } = req.body;
  console.log('REQ BODY', req.body);
  axios
    .post('https://curriculum-api.codesmith.io/messages', {
      created_by,
      message,
    })
    .then(() => console.log('POST SUCCESS'))
    .then(
      axios
        .delete('https://curriculum-api.codesmith.io/messages', {
          data: {
            created_by,
            message,
          },
        })
        .then(delRes => console.log('DELETE successful'))
        .catch(err => console.log('DELETE ERROR')),
    )
    .catch(err => console.error('POST ERROR', err));
});

app.get('/chatz', (req, res) => {
  axios('https://curriculum-api.codesmith.io/messagez/')
    .then(response => res.status(200).json(response.data))
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});



app.get('/starwars', (req, res) => {
  axios('https://swapi.dev/api/people/')
    .then(response => {
      // console.log('EXTERNAL DATA', response.data);
      console.log('EXTERNAL STATUS', response.status);
      return res.sendStatus(200);
    })
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});

app.get('/bitcoin', (req, res) => {
  console.log('bitcoin endpoint');
  axios('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
    .then(res.sendStatus(200))
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});

app.get('/cat', (req, res) => {
  console.log('cat endpoint');
  axios('https://cat-fact.herokuapp.com/facts')
    .then(res.sendStatus(200))
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});

app.get('/bored', (req, res) => {
  console.log('bored endpoint');
  axios('https://www.boredapi.com/api/activity')
    .then(res.sendStatus(200))
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});

app.get('/universities', (req, res) => {
  console.log('universities endpoint');
  axios('http://universities.hipolabs.com/search?country=United+States')
    .then(res.sendStatus(200))
    .catch(err => {
      console.error(`EXTERNAL ERROR ${err}`);
      return res.sendStatus(400);
    });
});

const PORT = 8126;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// axios('http://localhost:8126/starwars')
//   .then(() => {
//     console.log('INTERNAL DATA');
//   })
//   .catch(() => {
//     console.log('INTERNAL ERROR');
//   });
