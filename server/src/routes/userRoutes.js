const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 🔁 Import controller
const { protect } = require('../middlewares/auth.middleware');
const { loginValidation , registerValidation } = require('../middlewares/userValidator');
const { validate } = require('../middlewares/validate.middleware');

// Route to get all users
// router.get('/', protect ,userController.getAllUsers);
router.post('/register' , registerValidation , validate ,userController.register);
router.post('/login' , loginValidation , validate ,userController.login);

// Route to register a new user
// router.post('/register', userController.registerUser);
module.exports = router; // ✅ Export router for app.js