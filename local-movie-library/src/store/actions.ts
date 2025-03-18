import { ActionTree } from 'vuex';
import { Movie } from '../models/Movie';
import { Folder } from '../models/Folder';

interface State {
  movies: Movie[];
  folders: Folder[];
}

export const actions: ActionTree<State, State> = {
  addMovie({ commit }, movie: Movie) {
    commit('ADD_MOVIE', movie);
  },

  removeMovie({ commit }, movieId: string) {
    commit('REMOVE_MOVIE', movieId);
  },

  createFolder({ commit }, folder: Folder) {
    commit('ADD_FOLDER', folder);
  },

  deleteFolder({ commit }, folderId: string) {
    commit('REMOVE_FOLDER', folderId);
  }
};