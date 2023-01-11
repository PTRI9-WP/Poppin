//BUSINESS REQUESTS TO SERVER GOES HERE
import axios from 'axios';
const URL = '/businesses';

export const businessService = {
  getAllBusinesses: async (businesses) => {
    const response = await axios.get(URL, businesses);

    if (response.data) {
      return response.data;
    }
  },
};
