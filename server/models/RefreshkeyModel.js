const Sequelize = require('sequelize');
const db = require('../db');

//By default, Sequelize automatically adds the primary key attribute id to every model when no primary key has been defined manually.
const Refreshkey = db.define('refreshkey', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  refreshkey: {
    type: Sequelize.STRING,
    unique: true,
  },

  // createdat: {
  //   type: Sequelize.DATE,
  // },
  // updatedat: {
  //   type: Sequelize.DATE,
  // },
});

module.exports = Refreshkey;
