require("dotenv").config();
const config = require("config");
const redisStream = require("./redis-stream");


const reqHostDB = {
  1: 'weather.google.com',
  2: 'api.coinbase.io',
  3: 'api.yahoo.com',
  4: 'surfapi.com'
};

const methodDB = {
  1: 'GET',
  2: 'POST',
  3: 'PUT',
  4: 'DELETE',
  5: 'PATCH'
};

const urlDB = {
  1: 'https://weather.google.com/getWeather',
  2: 'https://api.coinbase.io/getbtc',
  3: 'https://api.yahoo.com/getTemp',
  4: 'https://surfapi.com/getTides'
};

const pathDB = {
  1: '/getWeather',
  2: '/getbtc',
  3: '/getTemp',
  4: '/getTides'
};

const statusCodeDB = {
  1: 200,
  2: 200,
  3: 200,
  4: 200,
  5: 200,
  6: 200,
  7: 200,
  8: 403,
  9: 410,
  10: 505
};


const generateLogs = () => {

  const log = {}; 

  const serviceIndex = Math.floor(Math.random() * 10) + 1; 
  const generalIndex = Math.floor(Math.random() * 4) + 1; 

  let clientError = 0;
  let serverError = 0;
  let noError = 0; 
  let resMessage = 'OK'; 

  if(statusCodeDB[serviceIndex] >= 500){
      serverError = 1; 
      resMessage = 'Server Error'; 
    } else if (statusCodeDB[serviceIndex] >= 400){
      clientError = 1; 
      resMessage = 'Client Error'; 
    } else {
      noError = 1; 
      resMessage = 'OK';
    }

  log['reqHost'] = reqHostDB[generalIndex];
  log['reqMethod'] = methodDB[(Math.floor(Math.random() * 5)) + 1];
  log['reqPath'] = pathDB[generalIndex];
  log['reqUrl'] = urlDB[generalIndex];
  log['resStatusCode'] = statusCodeDB[serviceIndex]; 
  log['clientError'] = clientError;
  log['serverError'] = serverError;
  log['noError'] = noError;
  log['resMessage'] = resMessage;
  log['cycleDuration'] = (Math.random() * 1000 + 600); 
  return log; 

}

setInterval(() => {
  const log = generateLogs(); 
  redisStream.writeRedisStream('logstream', log);  
}, 1000)