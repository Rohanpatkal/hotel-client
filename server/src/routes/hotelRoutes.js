const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/list', hotelController.getHotels);
router.get('/suggestions', hotelController.getSearchSuggestions);
// <<<<<<< HEAD
// =======
router.get('/:id',hotelController.getHotelDetails);
// >>>>>>> 44fda61e (vernost client hotel project)

module.exports = router;