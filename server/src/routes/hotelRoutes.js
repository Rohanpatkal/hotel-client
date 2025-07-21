const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/list', hotelController.getHotels);
router.get('/suggestions', hotelController.getSearchSuggestions);

module.exports = router;