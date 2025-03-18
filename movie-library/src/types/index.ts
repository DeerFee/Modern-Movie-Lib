export interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    overview?: string;
  }
  
  export interface Folder {
    id: string; // изменили на string, так как компонент FolderList ожидает string
    name: string;
    movies: Movie[];
  }
  
  export interface MovieCardProps {
    movie: Movie;
    onSelect?: (movie: Movie) => void;
  }
  
  export interface FolderListProps {
    folders: Folder[];
    onFolderSelect: (folderId: string) => void; // обновили сигнатуру
  }