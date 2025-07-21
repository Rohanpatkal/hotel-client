const photoModel = require('../models/photo.model');

exports.savePhotos = async (photos) => {
  return await photoModel.bulkInsert(photos);
};
