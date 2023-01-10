//*** BCRYPT AND JWT CONSTANTS: AUTHENTICATION

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Business = require('../models/BusinessModel');
const Refreshkey = require('../models/RefreshkeyModel');

const businessController = {
  registerBusiness: async (req, res, next) => {
    const {
      username,
      businessname,
      password,
      email,
      poppinscore,
      maxcapacity,
      currentcapacity,
      location,
    } = req.body;
    try {
      if (
        !username ||
        !businessname ||
        !password ||
        !email ||
        !poppinscore ||
        !maxcapacity ||
        !currentcapacity ||
        !location
      ) {
        res.status(400);
        throw new Error('Please add all required fields');
      }

      const businessExists = await Business.findOne({ where: { email } });

      if (businessExists) {
        res.status(400);
        throw new Error('business already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the *salt*

      const newBusiness = await Business.create({
        username,
        businessname,
        password: hashedPassword,
        poppinscore,
        maxcapacity,
        currentcapacity,
        email,
        location,
      });

      res.status(200).json({
        _id: newBusiness.id,
        username,
        email,
        location,
        token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '60d',
        }),
      });
    } catch (err) {
      const statusCode = res.statusCode ? res.statusCode : 500;
      res.status(statusCode).json({
        message: err.message ? err.message : 'An unknown error occured',
      });
    }
  },

  loginBusiness: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('please enter all required fields');
      }

      const businessExists = await business.findOne({ where: { email } });

      if (!businessExists) {
        res.status(500);
        throw new Error('business does not exist');
      }

      if (await bcrypt.compare(password, businessExists.password)) {
        const tokens = {
          token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20m',
          }),
          refreshToken: jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET),
        };

        Refreshkey.create({ email, refreshtoken: tokens.refreshToken });
        // 2. write a function to store the email and the token <-- Completed

        //added tokens to cookies so it will remain on the user
        res.cookie = tokens;
        //MAKE SURE TO GRAB TOKENS.TOKEN
        res.status(200).json({
          email,
          username: businessExists.username,
          businessname: businessExists.businessname,
          location: businessExists.location,
          tokens,
        });

        //added next to pas tokens
        next();
      } else {
        res.status(400);
        throw new Error('Email and Password combination is invalid');
      }
    } catch (err) {
      const statusCode = res.statusCode ? res.statusCode : 500;
      res.status(statusCode).json({
        message: err.message ? err.message : 'An unknown error occured',
      });
    }
  },

  getAllBusinessess: async (_, res) => {
    try {
      const businesses = await Business.findAll();
      res.status(200).json(businesses);
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

            const deleteBusiness = Refreshkey.findOne({ where: { email } });
            deleteBusiness.destroy;

            Refreshkey.create({
              email,
              refreshtoken: tokens.refreshToken,
            });

            // send the business back as json an accesstoken and refreshtoken
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
          : 'Error in the checkAccessToken Function in businessController',
      });
    }
  },
};

module.exports = businessController;
