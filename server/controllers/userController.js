//*** BCRYPT AND JWT CONSTANTS: AUTHENTICATION

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel');
const User = require('../models/UserModel');

const Refreshkey = require('../models/RefreshkeyModel');

const userController = {
  registerUser: async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
      if (!username || !password || !email) {
        res.status(400);
        throw new Error('Please add all required fields');
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
        location: 'New York',
      });

      //TESTING ALL THAT COMES FROM USER
      // res.status(200).json(newUser);

      res.status(200).json({
        _id: newUser.id,
        username,
        email,
        location,
        token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20m',
        }),
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('please enter all required fields');
      }

      const userExists = await User.findOne({ where: { email } });

      if (!userExists) {
        res.status(500);
        throw new Error('user does not exist');
      }

      if (await bcrypt.compare(password, userExists.password)) {
        const tokens = {
          token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20m',
          }),
          refreshToken: jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET),
        };

        // Refreshkey.create({ email, refreshtoken: tokens.refreshToken });

        // 2. write a function to store the email and the token <-- Completed

        //added tokens to cookies so it will remain on the user
        res.cookie = tokens;
        //MAKE SURE TO GRAB TOKENS.TOKEN
        res.status(200).json({
          _id: userExists.id,

          email,
          username: userExists.username,
          location: userExists.location,
          tokens,
        });

        //added next to pas tokens
        next();
      } else {
        res.status(400);
        throw new Error('Email and Password combination is invalid');
      }
    } catch (err) {
      return next(err);
    }
  },

  getAllUsers: async (_, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      const statusCode = res.statusCode ? res.statusCode : 500;
      res.status(statusCode).json({
        message: err.message ? err.message : 'An unknown error occured',
      });
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      if (res.cookie) {
        if (
          !jwr.verify(res.cookie.accessToken, process.env.ACCESS_TOKEN_SECRET)
        ) {
          const checkForRefreshToken = await Refreshkey.findOne({
            where: { email },
          });

          if (checkForRefreshToken) {
            const tokens = {
              accessToken: jwt.sign(
                { email },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: '20m',
                }
              ),
              refreshToken: jwt.sign(
                { email },
                process.env.REFRESH_TOKEN_SECRET
              ),
            };

            const deleteUser = Refreshkey.findOne({ where: { email } });
            deleteUser.destroy;

            Refreshkey.create({
              email,
              refreshtoken: tokens.refreshToken,
            });

            // send the user back as json an accesstoken and refreshtoken
            res.cookie = tokens;
            return next();
          }
        }
      }
    } catch (err) {
      const statusCode = res.statusCode ? res.statusCode : 500;
      res.status(statusCode).json({
        message: err.message
          ? err.message
          : 'Error in the checkAccessToken Function in UserController',
      });
    }
  },

  // checkAccessToken: async (req, res, next) => {
  //   try {
  //     if (res.cookie) {
  //       if (
  //         !jwr.verify(res.cookie.accessToken, process.env.ACCESS_TOKEN_SECRET)
  //       ) {
  //         const checkForRefreshToken = await Refreshkey.findOne({
  //           where: { email },
  //         });

  //         if (checkForRefreshToken) {
  //           const tokens = {
  //             accessToken: jwt.sign(
  //               { email },
  //               process.env.ACCESS_TOKEN_SECRET,
  //               {
  //                 expiresIn: '20m',
  //               }
  //             ),
  //             refreshToken: jwt.sign(
  //               { email },
  //               process.env.REFRESH_TOKEN_SECRET
  //             ),
  //           };

  //           const deleteUser = Refreshkey.findOne({ where: { email } });
  //           deleteUser.destroy;

  //           Refreshkey.create({
  //             email,
  //             refreshtoken: tokens.refreshToken,
  //           });

  //           // send the user back as json an accesstoken and refreshtoken
  //           res.cookie = tokens;
  //           return next();
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     const statusCode = res.statusCode ? res.statusCode : 500;
  //     res.status(statusCode).json({
  //       message: err.message
  //         ? err.message
  //         : 'Error in the checkAccessToken Function in UserController',
  //     });
  //   }
  // },
};

module.exports = userController;
