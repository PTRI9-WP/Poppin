const Sequelize = require('sequelize');
const db = require('../db');

//By default, Sequelize automatically adds the primary key attribute id to every model when no primary key has been defined manually.
const Business = db.define('business', {
  username: {
    type: Sequelize.STRING,
  },
  businessname: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  poppinscore: {
    type: Sequelize.INTEGER,
  },
  maxcapacity: {
    type: Sequelize.INTEGER,
  },
  currentcapacity: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.STRING,
  },
  created: {
    type: Sequelize.DATE,
  },
  updated: {
    type: Sequelize.DATE,
  },
});

module.exports = Business;
