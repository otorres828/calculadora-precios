var Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(process.env.deliciouscake_DATABASE, process.env.deliciouscake_USER, process.env.deliciouscake_PASSWORD, {
  host: process.env.deliciouscake_HOST,
  dialect: 'postgres', // Especificamos que usamos PostgreSQL
  port: 5432, // Puerto por defecto de PostgreSQL
  ssl: {
    rejectUnauthorized: false // Descomenta esto solo en entornos de desarrollo
  }
});

module.exports = sequelize;
