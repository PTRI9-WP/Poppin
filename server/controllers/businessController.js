//*** BCRYPT AND JWT CONSTANTS: AUTHENTICATION

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Business = require('../models/BusinessModel');
const Refreshkey = require('../models/RefreshkeyModel');
const { Client } = require('@googlemaps/google-maps-services-js');
const generatedCodes = require('../seeders/generatedCodes');
const getPoppinScore = require('../utils/getPoppinScore');

const businessController = {
  registerBusiness: async (req, res, next) => {
    const {
      username,
      businessname,
      password,
      email,
      location,
      poppinscore,
      maxcapacity,
      currentcapacity,
      image,
      phonenumber,
      incentive,
    } = req.body;

    let { latitude, longitude } = req.body;

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

      const geocodingClient = new Client({});
      let params = {
        address: location,
        key: 'AIzaSyDzT6YYS0tMZIKZCDuv5L566AY5rlZlzpU',
      };

      await geocodingClient
        .geocode({ params })
        .then((response) => {
          let { lat, lng } = response.data.results[0].geometry.location;
          latitude = lat;
          longitude = lng;
        })
        .catch((error) => console.log(error));

      const newBusiness = await Business.create({
        username,
        businessname,
        password,
        email,
        location,
        poppinscore,
        maxcapacity,
        currentcapacity,
        latitude,
        longitude,
        image,
        phonenumber,
        incentive,
        currentcode: 'felix',
        codestouse: generatedCodes,
        storedcodes: [],
      });

      const tokens = {
        token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20m',
        }),
      };

      res.status(200).json({
        id: newBusiness.id,
        username,
        email,
        location,
        tokens,
        latitude,
        longitude,
        image,
        phonenumber,
        incentive,
        currentcode: newBusiness.currentcode,
        codestouse: newBusiness.codestouse,
        storedcodes: newBusiness.storedcodes,
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
    const { currentcapacity, maxcapacity } = req.body;

    const poppinPercentage = (currentcapacity / maxcapacity) * 100;
    let newPoppinScore = getPoppinScore(poppinPercentage);

    try {
      const business = await Business.findOne({ where: { id: req.params.id } });
      if (!business) {
        res.status(400);
        throw new Error('business not found');
      }

      if (business.currentcapacity > business.maxcapacity) {
        res.status(400);
        throw new Error('Business is fully booked');
      }

      const poppinPercentage =
        (business.currentcapacity / business.maxcapacity) * 100;

      let newPoppinScore = getPoppinScore(poppinPercentage);
      await business.set({
        poppinscore: parseInt(newPoppinScore),
        currentcapacity: parseInt(business.currentcapacity) + 1,
        maxcapacity: parseInt(business.maxcapacity),
      });
      await business.save();
      res.status(200).json({
        id: req.params.id,
        poppinscore: business.poppinscore,
        currentcapacity: business.currentcapacity,
      });
    } catch (err) {
      console.log(err, 'error in updateBusiness');
      return next(err);
    }
  },

  checkDealCode: async (req, res, next) => {
    const { code } = req.body;
    try {
      const business = await Business.findByPk(req.params.id);
      const currentcode = business.currentcode;
      console.log('code from db ==>', currentcode);
      console.log('req.bodycode ==>', code);
      if (code === currentcode) {
        //push current code into database in column storedcodes
        business.storedcodes.push(currentcode);
        const codestouse = business.codestouse;
        const newCode = codestouse.pop();
        //set currentcode to new code in db
        await Business.update(
          {
            currentcode: newCode,
            codestouse: codestouse,
            storedcodes: business.storedcodes,
          },
          {
            where: { id: req.params.id },
          }
        );
        res.status(200).json({
          message: 'Code matched, new code generated',
          nextCode: newCode,
          codestouse: codestouse,
          storedcodes: business.storedcodes,
        });
      } else {
        res.status(400);
        throw new Error('code does not match');
      }
    } catch (err) {
      console.log(err, 'error in getDealCode');
      return next(err);
    }
  },

  // useDealCode: async (req, res, next) => {
  //      try {
  //        const business = await Business.findAll({
  //          where: { id: req.params.id },
  //        });
  //        const currentcode = business.currentcode;
  //        //push current code into database in column storedcodes
  //        business.set({
  //          storedcodes: [...business.storedcodes, currentcode],
  //        });
  //        const codestouse = business.codetouse;
  //        const newCode = codestouse.pop();
  //        //set currentcode to new code in db
  //        business.set({
  //          currentcode: newCode,
  //          codestouse: codestouse,
  //        });
  //        res.status(200).json({
  //          currentcode,
  //        });
  //        //set codestouse in db = variable codes to use
  //      } catch (err) {
  //        console.log(err, 'error in getDealCode');
  //        return next(err);
  //      }
  // },

  getAllBusinesses: async (_, res, next) => {
    try {
      const businesses = await Business.findAll({
        attributes: [
          'id',
          'businessname',
          'poppinscore',
          'maxcapacity',
          'currentcapacity',
          'location',
          'latitude',
          'longitude',
          'image',
          'phonenumber',
          'incentive',
          'currentcode',
          'storedcodes',
          'codestouse',
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

  deleteBusiness: async (req, res, next) => {
    try {
      const business = await Business.destroy({ where: { id: req.params.id } });
      console.log('business removed');
      res.status(200).json({ message: 'business removed' });
    } catch (err) {
      console.log(err, 'error in deleteBusiness');
      return next(err);
    }
  },
};

module.exports = businessController;
