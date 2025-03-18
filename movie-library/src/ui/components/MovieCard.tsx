import React from 'react';
import { MovieCardProps } from '../../types';

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
    return (
        <div 
            className="movie-card"
            onClick={() => onSelect?.(movie)}
        >
            {movie.poster_path ? (
                <img src={movie.poster_path} alt={movie.title} />
            ) : (
                <div className="movie-placeholder">{movie.title[0]}</div>
            )}
            <h3>{movie.title}</h3>
            {movie.overview && <p>{movie.overview}</p>}
        </div>
    );
};

export default MovieCard;