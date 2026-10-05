import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getRecords = () => axios.get(`${API_URL}/records`);
export const addRecord = (data) => axios.post(`${API_URL}/records`, data);
export const deleteRecord = (id) => axios.delete(`${API_URL}/records/${id}`);
export const getAnalysis = () => axios.get(`${API_URL}/analysis`);
export const generateSampleData = () => axios.post(`${API_URL}/generate_sample_data`);
