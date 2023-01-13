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
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  image: {
    type: Sequelize.STRING,
  },
  phonenumber: {
    type: Sequelize.INTEGER,
  },
  incentive: {
    type: Sequelize.STRING,
  },
  currentcode: {
    type: Sequelize.STRING,
  },
  codestouse: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  storedcodes: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Business;
