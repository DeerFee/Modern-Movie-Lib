import React from 'react';
import { Movie, Folder } from '../../types';
import { getFolders } from '../../services/folderService';
import { getMovies } from '../../services/movieService';
import FolderList from '../components/FolderList';
import MovieCard from '../components/MovieCard';
import './Library.css';

export const Library: React.FC = () => {
    const [folders, setFolders] = React.useState<Folder[]>([]);
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [selectedFolderId, setSelectedFolderId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            const fetchedFolders = await getFolders();
            const fetchedMovies = await getMovies();
            setFolders(fetchedFolders);
            setMovies(fetchedMovies);
        };

        fetchData();
    }, []);

    const handleFolderSelect = (folderId: string) => {
        setSelectedFolderId(folderId);
    };

    const handleMovieSelect = (movie: Movie) => {
        // Логика выбора фильма
        console.log('Выбран фильм:', movie.title);
    };

    return (
        <div className="library-container">
            <h1>Моя Библиотека Фильмов</h1>
            <FolderList 
                folders={folders} 
                onFolderSelect={handleFolderSelect} 
            />
            <div className="movie-list">
                {movies.map(movie => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie}
                        onSelect={handleMovieSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;