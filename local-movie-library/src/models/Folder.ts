import { Movie } from './Movie';

export interface Folder {
  id: string;
  name: string;
  movies: Movie[];
  createdAt: Date;
}