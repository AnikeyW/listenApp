import axios from 'axios';

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem('accessToken')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`;
    return config;
  }
  return config;
});

export default $api;
