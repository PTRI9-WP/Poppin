const express = require('express');
const router = express.Router();

const businessController = require('../controllers/businessController');

router.get('/', businessController.getAllBusinesses);
router.post('/login', businessController.loginBusiness);
router.post('/', businessController.registerBusiness);
router.put('/:id', businessController.updateBusiness);
router.delete('/:id', businessController.deleteBusiness);

// router.route('/').get(getAllUsers).post(registerUser);
// router.route('/login').post(loginUser);

module.exports = router;