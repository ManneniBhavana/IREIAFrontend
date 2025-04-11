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
      price: item?.list_price || null,
      image: item?.primary_photo?.href || null,
      beds: item?.description?.beds ?? null,
      baths: item?.description?.baths ?? null,
      sqft: item?.description?.sqft ?? null,
      location: item?.location || {},
      estimate: item?.estimate?.estimate ?? null,
      rental_estimate: item?.rental_estimate ?? null,
      raw: item // keep original in case you want to pass full data later
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