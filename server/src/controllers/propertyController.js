const service = require('../services/propertyService');
const photoService = require('../services/photoService');

exports.uploadPropertyPhotos = async (req, res) => {
  const propertyId = req.params.id;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    // ✅ Use service to check property existence
    const property = await propertyService.getPropertyById(propertyId);
    if (!property) {
      return res.status(400).json({
        message: `Property with ID ${propertyId} not found. Cannot upload photos.`
      });
    }

    // ✅ Labels can be an array or single string if one photo
    const labels = Array.isArray(req.body.label) ? req.body.label : [req.body.label];
    const imageNames = Array.isArray(req.body.imageName) ? req.body.imageName : [req.body.imageName];

    // ✅ Ensure label count matches file count
    if (labels.length !== files.length) {
      return res.status(400).json({ message: 'Number of labels must match number of photos.' });
    }

    // ✅ Prepare photo data
    const photoData = files.map((file, index) => ({
      // property_id: propertyId,
      // label: labels[index], // label: req.body.label || null,
      // image_name: file.originalname,
      // image_path: `/uploads/${file.filename}`
      property_id: propertyId,
      label: labels[index],                            // ✅ Get the correct label per photo
      image_name: imageNames[index] || file.originalname,
      image_path: `/uploads/${file.filename}`
    }));

    // ✅ Save photos
    await photoService.savePhotos(photoData);

    res.status(201).json({
      message: 'Photos uploaded successfully!',
      photos: photoData
    });

  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({
      message: 'Photo upload failed',
      error: err.message
    });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const data = await service.getProperties();
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const data = await service.getPropertyById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const propertyService = require('../services/propertyService');

exports.searchProperties = async (req, res) => {
  try {
    const filters = req.query;
    const results = await propertyService.searchProperties(filters);

    if (results.length === 0) {
      // return res.status(404).json({ message: 'No properties found' });
      return res.status(200).json(results); // Always return 200, even if empty
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addProperty = async (req, res) => {
  try {
    const body = req.body;
    const requiredFields = ['property_name', 'property_code', 'property_type', 'base_currency'];

    for (let field of requiredFields) {
      if (!body[field]) return res.status(400).json({ message: `${field} is required` });
    }

    // const data = [
    //   body.property_name, body.property_code, body.property_type, body.base_currency,
    //   body.star_category, body.description, body.address, body.zip_code,
    //   body.latitude, body.longitude, body.contact_name, body.contact_number,
    //   body.contact_email, body.chain_id, body.country_id, body.state_id,
    //   body.city_id, body.checkin_time, body.checkout_time, body.status || 1
    // ];

    const starMap = {
      '1 Star': 1,
      '2 Star': 2,
      '3 Star': 3,
      '4 Star': 4,
      '5 Star': 5
    };

    const data = [
      body.property_name,
      body.property_code,
      body.property_type,
      body.base_currency,
      body.star_category = starMap[body.star_category] || null,
      body.description,
      body.usp || null,                    // NEW
      body.address,
      body.zip_code,
      body.latitude,
      body.longitude,

      null,
      null,
      null,
      // body.contact_name,
      // body.contact_number,
      // body.contact_email,

      body.chain_id,
      body.country_id,
      body.state_id,
      body.city_id,
      body.checkin_time,
      body.checkout_time,
      body.status ?? 1,
      body.business_type || null,          // NEW
      body.commission || null,            // NEW
      body.channel_manager || null        // NEW
    ];

    // const insertId = await service.addProperty(data);
    // res.status(201).json({ message: 'Property created', id: insertId });
    const contacts = body.contacts || [];

    const insertId = await propertyService.addPropertyWithContacts(data, contacts);
    res.status(201).json({ message: 'Property created', property_id: insertId });


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const data = [
      body.property_name, body.property_code, body.property_type, body.base_currency,
      body.star_category, body.description, body.address, body.zip_code,
      body.latitude, body.longitude, body.contact_name, body.contact_number,
      body.contact_email, body.chain_id, body.country_id, body.state_id,
      body.city_id, body.checkin_time, body.checkout_time, body.status || 1
    ];

    const updated = await service.updateProperty(id, data);
    if (!updated) return res.status(404).json({ message: 'Property not found' });

    res.json({ message: 'Property updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await service.deleteProperty(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
