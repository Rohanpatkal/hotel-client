const hotelModel = require('../models/hotel.model');

exports.getProperties = async (query , sort , filters) => {
    return await hotelModel.getHotelList(query , sort , filters);
};

<<<<<<< HEAD
=======
exports.getHotelDetails = async (propertyId) => {
    return await hotelModel.getHotelDetails(propertyId);
}

>>>>>>> 44fda61e (vernost client hotel project)
exports.getSearchSuggestions = async (query) => {
    return await hotelModel.getSearchSuggestions(query);
};