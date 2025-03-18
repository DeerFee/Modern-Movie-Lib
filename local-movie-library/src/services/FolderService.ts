import { Folder } from '../models/Folder';
import { Movie } from '../models/Movie';

export class FolderService {
  private folders: Folder[] = [];

  createFolder(name: string): Folder {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      movies: [],
      createdAt: new Date()
    };
    this.folders.push(newFolder);
    return newFolder;
  }

  deleteFolder(id: string): boolean {
    const index = this.folders.findIndex(folder => folder.id === id);
    if (index !== -1) {
      this.folders.splice(index, 1);
      return true;
    }
    return false;
  }

  addMovie(folderId: string, movie: Movie): boolean {
    const folder = this.folders.find(f => f.id === folderId);
    if (folder) {
      folder.movies.push(movie);
      return true;
    }
    return false;
  }

  removeMovie(folderId: string, movieId: number): boolean {
    const folder = this.folders.find(f => f.id === folderId);
    if (folder) {
      const index = folder.movies.findIndex(m => m.id === movieId);
      if (index !== -1) {
        folder.movies.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  getFolders(): Folder[] {
    return [...this.folders];
  }

  getFolder(id: string): Folder | null {
    return this.folders.find(f => f.id === id) || null;
  }
}