const hotelModel = require('../models/hotel.model');

exports.getProperties = async (query , sort , filters) => {
    return await hotelModel.getHotelList(query , sort , filters);
};

exports.getSearchSuggestions = async (query) => {
    return await hotelModel.getSearchSuggestions(query);
};