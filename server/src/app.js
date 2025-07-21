const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('dotenv').config(); //  Load environment variables from .env
require('./config/db');

const userRoutes = require('./routes/userRoutes');
const propertiesRoutes = require('./routes/propertyRoutes');
const hotelRoutes = require('./routes/hotelRoutes');

app.use('/api/users' , userRoutes) ; // Mount user routes
app.use('/api/properties' , propertiesRoutes);
app.use('/api/hotels', hotelRoutes);

module.exports = app;