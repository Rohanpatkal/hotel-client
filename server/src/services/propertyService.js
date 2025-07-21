const property = require('../models/property.model');

exports.addPropertyWithContacts = async (propertyData, contacts) => {
  const insertId = await property.add(propertyData);
  if (contacts && contacts.length > 0) {
    await property.addContacts(insertId, contacts);
  }
  return insertId;
};

exports.getPropertyWithContacts = async (id) => {
  const prop = await property.getById(id);
  const contacts = await property.getContactsByPropertyId(id);
  return { ...prop, contacts };
};

exports.getProperties = async () => {
  return await property.getAll();
};

exports.getPropertyById = async (id) => {
  return await property.getById(id);
};

exports.addProperty = async (data) => {
  return await property.add(data);
};

exports.updateProperty = async (id, data) => {
  return await property.update(id, data);
};

exports.deleteProperty = async (id) => {
  return await property.remove(id);
};

exports.searchProperties = async (filters) => {
  return await property.searchProperties(filters);
};

