const express = require('express');
const db = require('./db');

//this is how you pull in the env file
require('dotenv').config();

const userRoutes = require('./routes/users');
const businessRoutes = require('./routes/businesses');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('ERROR', err));

app.use('/users', userRoutes);

app.use('/businesses', businessRoutes);

// //catch all route handler
// app.use((_, res) => res.status(404).send('page not found'));

//global error handler

app.use((err, _, res, __) => {

  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message ? err.message : 'An unknown error occured',
  });
});

app.listen(3005, () => {
  console.log('server connected on 3005');
});
