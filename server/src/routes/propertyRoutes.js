const multer = require('multer');
const path = require('path');

const express = require('express');
const router = express.Router();
const controller = require('../controllers/propertyController');

router.get('/', controller.getAllProperties);
router.get('/search', controller.searchProperties);
router.get('/:id', controller.getProperty);
router.post('/add', controller.addProperty);
router.post('/update/:id', controller.updateProperty);
router.post('/delete/:id', controller.deleteProperty);

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to /uploads
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Upload images for property
router.post('/:id/photos', upload.array('photos'), controller.uploadPropertyPhotos);

module.exports = router;