export const API_CONFIG = {
    baseURL: 'https://api.themoviedb.org/3',
    apiKey: process.env.VITE_TMDB_API_KEY,
    language: 'ru-RU',
    imageBaseURL: 'https://image.tmdb.org/t/p/',
    posterSize: 'w500',
    backdropSize: 'original'
  };
  
  export const ENDPOINTS = {
    popular: '/movie/popular',
    search: '/search/movie',
    movie: '/movie'
  };