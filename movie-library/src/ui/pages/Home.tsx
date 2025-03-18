import React from 'react';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../../services/movieService';
import { useFolders } from '../../services/folderService';

const Home: React.FC = () => {
    const { movies } = useMovies();
    const { folders } = useFolders();

    return (
        <div className="home">
            <h1>Featured Movies</h1>
            <div className="movie-list">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <h2>Your Folders</h2>
            <div className="folder-list">
                {folders.map(folder => (
                    <div key={folder.id} className="folder">
                        {folder.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;