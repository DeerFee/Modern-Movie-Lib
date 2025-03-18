import axios from 'axios';
import { API_CONFIG } from './config';

const tmdbApi = axios.create({
  baseURL: API_CONFIG.baseURL,
  params: {
    api_key: API_CONFIG.apiKey,
    language: API_CONFIG.language
  }
});

export default tmdbApi;