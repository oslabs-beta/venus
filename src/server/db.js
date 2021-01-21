const { Pool } = require('pg'); 

const config = {
  user: process.env.DB_NAME, 
  host: process.env.REDIS_HOST, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASS, 
  port: 5432
}; 

const pool = new Pool(config); 

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query: ', text); 
    return pool.query(text, params, callback); 
  }
}