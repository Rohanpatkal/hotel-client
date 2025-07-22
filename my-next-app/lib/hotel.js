import instance from '../lib/axios'; // or "@/lib/axios" if using alias

// export const fetchHotels = async (searchText, selectedFilter) => {
//   try {
//     console.log('api: ', `/hotels/list?query=${searchText}&sort=${selectedFilter}`);

//     const response = await instance.get(`/hotels/list?query=${searchText}&sort=${selectedFilter}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching hotels:', error);
//     return [];
//   }
// };

export const fetchHotels = async (
  searchText,
  selectedFilter,
  minPrice,
  maxPrice,
  selectedStars = [],
  selectedInclusions = []
) => {
  try {
    const params = new URLSearchParams();

    if (searchText) params.append('query', searchText);
    if (selectedFilter) params.append('sort', selectedFilter);
    if (minPrice !== undefined) params.append('minPrice', minPrice);
    if (maxPrice !== undefined) params.append('maxPrice', maxPrice);
    if (selectedStars.length > 0) params.append('stars', selectedStars.join(','));
    if (selectedInclusions.length > 0) params.append('inclusions', selectedInclusions.join(','));

    console.log('API:', `/hotels/list?${params.toString()}`);

    const response = await instance.get(`/hotels/list?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};

export const fetchHotelDetails = async (propertyId) => {
  try {
    const response = await instance.get(`/hotels/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    return null;
  }
};

export const fetchSearchSuggestions = async (query) => {
  try {
    // console.log(query);
    const response = await instance.get(`/hotels/suggestions?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    return [];
  }
};