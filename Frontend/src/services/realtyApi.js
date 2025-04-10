import axios from 'axios';

const realtyApi = axios.create({
  baseURL: 'https://realty-in-us.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  }
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchProperties = async (query) => {
  try {
    await delay(300);

    const isZip = /^\d{5}$/.test(query);

    const response = await realtyApi.get('/properties/v3/list', {
      params: {
        limit: 10,
        offset: 0,
        sort: 'newest',
        postal_code: isZip ? query : undefined,
        city: !isZip ? query : undefined
      }
    });

    const results = response?.data?.data?.home_search?.results || [];

    return results.map((item) => ({
      property_id: item?.property_id,
      address: {
        full: item?.location?.address?.line,
        city: item?.location?.address?.city,
        state: item?.location?.address?.state_code,
        postal_code: item?.location?.address?.postal_code
      }
    }));
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
};

export const getPropertyDetails = async (propertyId) => {
  try {
    const response = await realtyApi.get('/properties/v2/detail', {
      params: { property_id: propertyId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    return null;
  }
}; 