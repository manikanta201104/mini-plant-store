import axios from 'axios';

const api = axios.create({
  baseURL: 'https://urvann-yz2n.onrender.com/api',
});

export default api;