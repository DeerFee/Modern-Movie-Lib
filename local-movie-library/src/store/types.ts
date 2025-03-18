import { Movie } from '../models/Movie';
import { Folder } from '../models/Folder';

export interface State {
  movies: Movie[];
  folders: Folder[];
}