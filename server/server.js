const express = require('express');
const app = express();
//this is how you pull in the env file
require('dotenv').config();

// const db = require('./db');
const userRoutes = require('./routes/users');

// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch((err) => console.log('ERROR', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.get('/api', (_, res) => {
  res.status(200).send('hello world');
});

//set up routes

//catch all route handler
app.use((_, res) => res.status(404).send('page not found'));

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
