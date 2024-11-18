const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'costos',
  "root",
  null,
  {
    dialect: 'sqlite',
    host: './config/costos.sqlite',
  }
);

module.exports = sequelize;
