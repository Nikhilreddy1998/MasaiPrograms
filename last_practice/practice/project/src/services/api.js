import axios from 'axios';

const MOCK_DATA_URL = '/mockData.json';

export const fetchEstablishments = async () => {
  try {
    console.log('Fetching establishments from:', MOCK_DATA_URL);
    const response = await axios.get(MOCK_DATA_URL);
    
    if (!response.data || !response.data.establishments) {
      throw new Error('Invalid data format');
    }
    
    return response.data.establishments;
  } catch (error) {
    console.error('Error fetching establishments:', error);
    throw error;
  }
};