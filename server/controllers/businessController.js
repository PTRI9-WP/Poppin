//*** BCRYPT AND JWT CONSTANTS: AUTHENTICATION

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Business = require('../models/BusinessModel');
const Refreshkey = require('../models/RefreshkeyModel');

const businessController = {
  registerBusiness: async (req, res, next) => {
    const { username, businessname, password, email, location } = req.body;
    try {
      if (!username || !businessname || !password || !email || !location) {
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
        poppinscore: 20,
        maxcapacity: 100,
        currentcapacity: 0,
        email,
        location,
      });

      const tokens = {
        token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20m',
        }),
      };

      res.status(200).json({
        _id: newBusiness.id,
        username,
        email,
        location,
        tokens,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  loginBusiness: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('please enter all required fields');
      }

      const businessExists = await Business.findOne({ where: { email } });

      if (!businessExists) {
        res.status(500);
        throw new Error('Email and Password combination is invalid');
      }

      console.log('EMAIL WAS FOUND!');

      if (await bcrypt.compare(password, businessExists.password)) {
        console.log('password worked!');
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
      console.log(err);
      return next(err);
    }
  },

  updateBusiness: async (req, res, next) => {
    const { poppinscore, currentcapacity, maxcapacity } = req.body;

    //percentage of current capacity to max capacity
    //if current capacity = 0 - 20% make poppin score = 20
    //if current capacity = 21 - 40% make poppin score = 40
    //if current capacity = 41 - 60% make poppin score = 60
    //if current capacity = 61 - 80% make poppin score = 80
    //if current capacity = 81 - 100% make poppin score = 100

    const poppinPercentage = (currentcapacity / maxcapacity) * 100;
    let updatedPoppinScore;
    switch (poppinPercentage) {
      case poppinPercentage <= 20:
        updatedPoppinScore = 20;
        break;

      case poppinPercentage <= 40:
        updatedPoppinScore = 40;
        break;

      case poppinPercentage <= 60:
        updatedPoppinScore = 60;
        break;

      case poppinPercentage <= 80:
        updatedPoppinScore = 80;
        break;

      case poppinPercentage <= 100:
        updatedPoppinScore = 100;
        break;
    }

    try {
      const business = await Business.findOne({ id: req.params.id });
      if (!business) {
        res.status(400);
        throw new Error('business not found');
      }
      await business.set({ poppinscore: updatedPoppinScore, currentcapacity });
      await business.save();
      res.status(200).json({ id: req.params.id });
    } catch (err) {
      console.log(err, 'error in updateBusiness');
      return next(err);
    }
  },

  getAllBusinesses: async (_, res, next) => {
    try {
      const businesses = await Business.findAll({
        attributes: [
          'businessname',
          'poppinscore',
          'maxcapacity',
          'currentcapacity',
          'location',
        ],
      });

      res.status(200).json({
        businesses,
      });
    } catch (err) {
      console.log(err, 'error in getAllBusinessess');
      return next(err);
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
