const db = require('../config/db');

// Save multiple contacts
exports.addContacts = async (propertyId, contacts) => {
  const query = `
    INSERT INTO contacts (property_id, name, contact_number, email, fax)
    VALUES ?
  `;

  const values = contacts.map(c => [
    propertyId,
    c.name,
    c.contactNumber,
    c.email,
    c.fax || null
  ]);

  const [result] = await db.query(query, [values]);
  return result.affectedRows;
};

// Get contacts for a property
exports.getContactsByPropertyId = async (propertyId) => {
  const [rows] = await db.query(
    `SELECT * FROM contacts WHERE property_id = ?`,
    [propertyId]
  );
  return rows;
};

exports.getAll = async () => {
  const [rows] = await db.query(`SELECT 
      p.property_id,
      p.property_name,
      p.property_code,
      c.country_name AS country,
      s.state_name AS state,
      ci.city_name AS city,
      ch.chain_name  AS chain,
      p.status
    FROM 
      property p
    LEFT JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    ORDER BY p.created_at DESC
  `);
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM property WHERE property_id = ?', [id]);
  return rows[0];
};

exports.add = async (data) => {
  const query = `INSERT INTO property (
  property_name, property_code, property_type, base_currency, star_category,
  description, usp, address, zip_code, latitude, longitude,
  contact_name, contact_number, contact_email,
  chain_id, country_id, state_id, city_id,
  checkin_time, checkout_time, status,
  business_type, commission, channel_manager
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
  const [result] = await db.query(query, data);
  return result.insertId;
};

exports.update = async (id, data) => {
  const query = `UPDATE property SET
    property_name=?, property_code=?, property_type=?, base_currency=?, star_category=?,
    description=?, address=?, zip_code=?, latitude=?, longitude=?,
    contact_name=?, contact_number=?, contact_email=?,
    chain_id=?, country_id=?, state_id=?, city_id=?,
    checkin_time=?, checkout_time=?, status=?
    WHERE property_id = ?`;

  const [result] = await db.query(query, [...data, id]);
  return result.affectedRows;
};

exports.remove = async (id) => {
  const [result] = await db.query('DELETE FROM property WHERE property_id = ?', [id]);
  return result.affectedRows;
};


exports.searchProperties = async (filters) => {
  let query = `
    SELECT 
      p.property_id,
      p.property_name,
      p.property_code,
      p.status,
      p.description,
      c.country_name AS country,
      s.state_name AS state,
      ct.city_name AS city,
      ch.chain_name AS chain
    FROM property p
    LEFT JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ct ON p.city_id = ct.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE 1 = 1
  `;

  const params = [];

  if (filters.country) {
    query += ` AND p.country_id = ?`;
    params.push(filters.country);
  }

  if (filters.state) {
    query += ` AND s.state_id LIKE ?`;
    params.push(`%${filters.state}%`);
  }

  if (filters.city) {
    query += ` AND ct.city_id LIKE ?`;
    params.push(`%${filters.city}%`);
  }

  if (filters.name) {
    query += ` AND p.property_name LIKE ?`;
    params.push(`%${filters.name}%`);
  }

  if (filters.code) {
    query += ` AND p.property_code LIKE ?`;
    params.push(`%${filters.code}%`);
  }

  if (filters.chain) {
    query += ` AND ch.chain_name LIKE ?`;
    params.push(`%${filters.chain}%`);
  }

  if (filters.status !== undefined && filters.status !== '') {
    query += ` AND p.status = ?`;
    params.push(filters.status === 'Active' ? 1 : 0);
  }

  const [rows] = await db.query(query, params);
  return rows;
};