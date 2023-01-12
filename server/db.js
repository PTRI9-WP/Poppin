//CONNECT  SERVER
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 73c4a748d4c9338bdb6eb660d9e70cb4f43c7656
const { Sequelize } = require('sequelize');
// console.log(process.env.URI, 'URI STRING');

module.exports = new Sequelize(process.env.URI, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
