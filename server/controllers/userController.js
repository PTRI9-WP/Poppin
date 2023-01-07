//*** BCRYPT AND JWT CONSTANTS: AUTHENTICATION

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel');
const User = require('../models/UserModel');

const userController = {
  checkIfUserExists: async (req, res, next) => {},

  registerUser: async (req, res, next) => {
    const { username, password, email, location } = req.body;
    try {
      if (!username || !password || !email || !location) {
        res.status(400);
        throw new Error('please add all required fields');
      }

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        res.status(400);
        throw new Error('user already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the *salt*

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        location,
      });

      res.status(200).json({
        _id: newUser.primaryKey,
        email,
        location,
        token: jwt.sign({ newUser }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '60d',
        }),
      });
    } catch (err) {
      console.log('in the catch statement');
      console.log('error --->', err);
      return next(err);
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('please enter all required fields');
    }

    const userExists = await User.findOne({ where: { email } }); //<--might be an extra set of {}

    if (!userExists) {
      res.status(500);
      throw new Error('user does not exist');
    }

    try {
      if (await bcrypt.compare(password, userExists.password)) {
        res.status(200).json({
          _id: userExists.primaryKey,
          email,
          token: jwt.sign({ userExists }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60d',
          }),
        });
      } else {
        res.status(400);
        throw new Error('Email and Password combination is invalid');
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getAllUsers: async (_, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userController;

//REGISTER USER FUNCTION

//AUTHENTICATE USER LOGIN

// *** MIDDLEWARE AUTHENTICATE TOKEN

// const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];  // <-- undefined or actual token

//   if(!token) return res.sendStatus(401).json({message: 'Not authorized'});

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if(err) return res.sendStatus(403) //<-- we see you have a token but its not valid so you no longer have access
//     const user = await user.findOne({where: {{email}});
//     req.user = {
//       _id = user.primaryKey,
//       email,
//       username,

//     }
//     return next()
//   })

// }
// };

// PUT INTO ENV FILE

// PUT INTO ENV FILE
