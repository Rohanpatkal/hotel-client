const hotelService = require('../services/hotelService');

// exports.getHotels = async (req, res) => {
//     const query = req.query.query || '';
//     const sort = req.query.sort || 'recommended';

//     try {
//         const hotels = await hotelService.getProperties(query,sort);
//         res.status(200).json(hotels);
//     } catch (err) {
//         console.error('Error fetching hotels:', err);
//         res.status(500).json({ message: 'Failed to fetch hotels' });
//     }
// };

exports.getHotels = async (req, res) => {
<<<<<<< HEAD
    const query = req.query.query || '';
    const sort = req.query.sort || 'recommended';

    // Extract filters from query params
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined;
    const stars = req.query.stars ? req.query.stars.split(',').map(Number) : [];
    const inclusions = req.query.inclusions ? req.query.inclusions.split(',') : [];

    const filters = { minPrice, maxPrice, stars, inclusions };

    try {
        const hotels = await hotelService.getProperties(query, sort, filters);
        res.status(200).json(hotels);
    } catch (err) {
        console.error('Error fetching hotels:', err);
        res.status(500).json({ message: 'Failed to fetch hotels' });
    }
=======
  const query = req.query.query || '';
  const sort = req.query.sort || 'recommended';

  // Extract filters from query params
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined;
  const stars = req.query.stars ? req.query.stars.split(',').map(Number) : [];
  const inclusions = req.query.inclusions ? req.query.inclusions.split(',') : [];

  const filters = { minPrice, maxPrice, stars, inclusions };

  try {
    const hotels = await hotelService.getProperties(query, sort, filters);
    res.status(200).json(hotels);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
>>>>>>> 44fda61e (vernost client hotel project)
};


exports.getSearchSuggestions = async (req, res) => {
  const query = req.query.query || '';
  try {
    const suggestions = await hotelService.getSearchSuggestions(query);
    res.status(200).json(suggestions);
  } catch (err) {
    console.error('Error fetching suggestions:', err);
    res.status(500).json({ message: 'Failed to fetch search suggestions' });
  }
};
<<<<<<< HEAD
=======

exports.getHotelDetails = async (req, res) => {
  try {
    const data = await hotelService.getHotelDetails(req.params.id);
    if (!data) return res.status(404).json({ message: 'Hotel not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
>>>>>>> 44fda61e (vernost client hotel project)
