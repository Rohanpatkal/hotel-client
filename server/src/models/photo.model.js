const db = require('../config/db');

exports.bulkInsert = async (photos) => {
  const values = photos.map(p => [p.property_id, p.label, p.image_name, p.image_path]);
  const query = `
    INSERT INTO property_photos (property_id, label, image_name, image_path)
    VALUES ?
  `;
  const [result] = await db.query(query, [values]);
  return result;
};
