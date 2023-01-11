//AUTH REQUESTS TO SERVERS GO HERE

import axios from 'axios';

const URL = '/users/';

const authService = {
  login: async (userData) => {
    const response = await axios.post(URL + 'login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
};

export default authService;
