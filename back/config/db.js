const { Pool } = require('pg');

const pool = new Pool({
  user:     process.env.deliciouscake_USER,
  password: process.env.deliciouscake_PASSWORD,
  host:     process.env.deliciouscake_HOST,
  port:     6543, // default Postgres port
  database: process.env.deliciouscake_DATABASE,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};