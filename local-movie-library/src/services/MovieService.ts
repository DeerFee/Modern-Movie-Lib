import { Movie } from '../models/Movie';
import { API_CONFIG, ENDPOINTS } from '../api/config';
import tmdbApi from '../api/tmdb';

export class MovieService {
  async getPopularMovies(page: number = 1): Promise<Movie[]> {
    const response = await tmdbApi.get(ENDPOINTS.popular, {
      params: { page }
    });
    return response.data.results;
  }

  async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    const response = await tmdbApi.get(ENDPOINTS.search, {
      params: { query, page }
    });
    return response.data.results;
  }

  async getMovieDetails(movieId: number): Promise<Movie> {
    const response = await tmdbApi.get(`${ENDPOINTS.movie}/${movieId}`);
    return response.data;
  }

  getImageUrl(path: string, size: string = 'original'): string {
    return `${API_CONFIG.imageBaseURL}${size}${path}`;
  }
}