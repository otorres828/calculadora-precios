const { Pool } = require('pg');

const pool = new Pool({
  user: 'default',
  password: 'h7ADso9RXESZ',
  host: 'ep-red-art-34547297-pooler.us-east-1.aws.neon.tech',
  port: 5432, // default Postgres port
  database: 'deliciouscake'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};