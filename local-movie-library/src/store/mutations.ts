import { MutationTree } from 'vuex';
import { Movie } from '../models/Movie';
import { Folder } from '../models/Folder';
import { State } from './index';

const mutations = {
  SET_MOVIES(state: State, movies: Movie[]) {
    state.movies = movies;
  },
  ADD_MOVIE(state: State, movie: Movie) {
    state.movies.push(movie);
  },

  REMOVE_MOVIE(state: State, movieId: number) {
    state.movies = state.movies.filter(movie => movie.id !== movieId);
  },

  SET_FOLDERS(state: State, folders: Folder[]) {
    state.folders = folders;
  },

  ADD_FOLDER(state: State, folder: Folder) {
    state.folders.push(folder);
  },

  REMOVE_FOLDER(state: State, folderId: string) {
    state.folders = state.folders.filter(folder => folder.id !== folderId);
  }
} as MutationTree<State>;

export default mutations;