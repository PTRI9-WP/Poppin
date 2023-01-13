const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/', registerUser);
router.delete('/:id', deleteUser);
// router.route('/').get(getAllUsers).post(registerUser);
// router.route('/login').post(loginUser);

module.exports = router;
