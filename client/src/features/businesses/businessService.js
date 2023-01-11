//BUSINESS REQUESTS TO SERVER GOES HERE
import axios from 'axios';
const URL = '/businesses';

const getAllBusinesses = async () => {
  const response = await axios.get(URL);
  console.log(response, 'RESPONSE FROM AXIOS');
  return response.data.businesses;
};

const businessService = {
  getAllBusinesses,
};

export default businessService;
