//CONNECT  SERVER

const { Sequelize } = require('sequelize');
// console.log(process.env.URI, 'URI STRING');

module.exports = new Sequelize(process.env.URI, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
