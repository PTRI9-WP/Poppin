const Sequelize = require('sequelize');
const db = require('../db');

//By default, Sequelize automatically adds the primary key attribute id to every model when no primary key has been defined manually.
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  location: {
    type: Sequelize.STRING,
  },

  // createdat: {
  //   type: Sequelize.DATE,
  // },
  // updatedat: {
  //   type: Sequelize.DATE,
  // },
});

module.exports = User;
