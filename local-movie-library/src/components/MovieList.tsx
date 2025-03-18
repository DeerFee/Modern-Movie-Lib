import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Movie } from '../models/Movie';
import { State } from '../store';
import MovieCard from './MovieCard';

const MovieList: FC = () => {
  const movies = useSelector((state: State) => state.movies);

  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h2>Нет фильмов в библиотеке</h2>
        <p>Добавьте фильмы с помощью кнопки "Добавить фильм"</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;