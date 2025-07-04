import axios from 'axios';

const API = 'http://localhost:5050/api/auth';

export const register = (email, password) =>
  axios.post(`${API}/register`, { email, password });

export const login = (email, password) =>
  axios.post(`${API}/login`, { email, password });
