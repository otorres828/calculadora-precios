const mysql = require('mysql2/promise');
const { Pool } = require('pg');

const isDevelopment = process.env.APP_ENV === 'development';

let pool;

if (isDevelopment) {
  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "costos",
    port: "3306"
  });
} else {
  pool = new Pool({
    user: process.env.deliciouscake_USER,
    password: process.env.deliciouscake_PASSWORD,
    host: process.env.deliciouscake_HOST,
    port: 5432,
    database: process.env.deliciouscake_DATABASE,
    ssl: {
      rejectUnauthorized: false // Descomenta esto solo en entornos de desarrollo
    }
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params)
};