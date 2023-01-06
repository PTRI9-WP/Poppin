const Sequelize = require('sequelize');
const db = require('../db');

//By default, Sequelize automatically adds the primary key attribute id to every model when no primary key has been defined manually.
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
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

module.exports = User;
