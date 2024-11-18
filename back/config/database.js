var Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('costos', 'root', '', {
  host: 'localhost',
  dialect: 'postgres', // Especificamos que usamos PostgreSQL
  port: 5432, // Puerto por defecto de PostgreSQL
  logging: console.log // Log all SQL queries
});

module.exports = sequelize;
