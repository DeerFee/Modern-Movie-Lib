import axios from 'axios';

const API_KEY = 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieData = async (movieId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
    }
};

export const searchMovies = async (query: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        return response.data.results;
    } catch (error) {
        console.error('Error searching for movies:', error);
        throw error;
    }
};