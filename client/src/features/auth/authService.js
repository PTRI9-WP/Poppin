//AUTH REQUESTS TO SERVERS GO HERE

import axios from 'axios';

const URL = '/users/';

const authService = {
  register: async (user) => {
    const response = await axios.post(URL, user);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
};

export default authService;
