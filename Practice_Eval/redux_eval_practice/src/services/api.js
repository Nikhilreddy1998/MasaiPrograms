// import axios from 'axios';

// const API_URL = 'https://ratings.food.gov.uk/OpenDataFiles/FHRS527en-GB.json';
// const MOCK_DATA_URL = '/mockData.json';

// export const fetchHygieneData = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data.establishments || [];
//   } catch (error) {
//     console.error('Error fetching hygiene data:', error);
//     throw error;
//   }
// };

// export const fetchMockData = async () => {
//   try {
//     console.log('Fetching mock data from:', MOCK_DATA_URL);
//     const response = await axios.get(MOCK_DATA_URL);
    
//     if (!response.data || !response.data.establishments) {
//       console.error('Invalid mock data format:', response.data);
//       throw new Error('Invalid mock data format');
//     }
    
//     console.log('Mock data fetched successfully:', response.data.establishments.length, 'establishments');
//     return response.data.establishments;
//   } catch (error) {
//     console.error('Error fetching mock data:', error.message);
//     if (error.response) {
//       console.error('Response data:', error.response.data);
//       console.error('Response status:', error.response.status);
//     }
//     throw error;
//   }
// };


// src/services/api.js
import axios from 'axios';

// Corrected API_URL as per the problem statement
const API_URL = 'https://ratings.food.gov.uk/api/open-data-files/FHRS529en-GB.json';
const MOCK_DATA_URL = '/mockData.json'; // Keep this for mock data if you use it

export const fetchHygieneData = async () => {
  console.log('Attempting to fetch live data from:', API_URL); // Added log
  try {
    const response = await axios.get(API_URL);
    console.log('Live API Response received, data length:', response.data.establishments?.length); // Added log
    return response.data.establishments || [];
  } catch (error) {
    console.error('Error fetching live hygiene data:', error);
    throw error;
  }
};

export const fetchMockData = async () => {
  try {
    console.log('Fetching mock data from:', MOCK_DATA_URL);
    const response = await axios.get(MOCK_DATA_URL);

    if (!response.data || !response.data.establishments) {
      console.error('Invalid mock data format:', response.data);
      throw new Error('Invalid mock data format');
    }

    console.log('Mock data fetched successfully:', response.data.establishments.length, 'establishments');
    return response.data.establishments;
  } catch (error) {
    console.error('Error fetching mock data:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};