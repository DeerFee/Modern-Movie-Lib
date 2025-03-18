import { configureStore } from '@reduxjs/toolkit';
import { Movie } from '../models/Movie';
import { Folder } from '../models/Folder';

export interface State {
  movies: Movie[];
  folders: Folder[];
}

const initialState: State = {
  movies: [
    {
      id: 1,
      title: 'Пример фильма',
      poster_path: 'https://via.placeholder.com/300x450',
      overview: 'Описание фильма',
      release_date: '2024',
      vote_average: 8.5
    }
  ],
  folders: []
};

const store = configureStore({
  reducer: {
    movies: (state = initialState.movies) => state,
    folders: (state = initialState.folders) => state
  },
  preloadedState: initialState
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;