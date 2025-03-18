import React, { FC } from 'react';
import { Movie } from '../models/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={movie.poster_path} 
        alt={movie.title} 
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <span className="release-date">{movie.release_date}</span>
      </div>
    </div>
  );
};

export default MovieCard;