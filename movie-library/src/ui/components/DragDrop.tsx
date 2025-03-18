import React, { useState } from 'react';

interface DragDropProps {
  onDrop: (movieId: string, folderId: string) => void;
  movies: { id: string; title: string }[];
  folders: { id: string; name: string }[];
}

const DragDrop: React.FC<DragDropProps> = ({ onDrop, movies, folders }) => {
  const [draggedMovieId, setDraggedMovieId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedMovieId(id);
  };

  const handleDrop = (folderId: string) => {
    if (draggedMovieId) {
      onDrop(draggedMovieId, folderId);
      setDraggedMovieId(null);
    }
  };

  return (
    <div className="drag-drop-container">
      {folders.map(folder => (
        <div
          key={folder.id}
          className="folder"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(folder.id)}
        >
          <h3>{folder.name}</h3>
          <div className="movie-list">
            {movies.map(movie => (
              <div
                key={movie.id}
                draggable
                onDragStart={() => handleDragStart(movie.id)}
                className="movie-card"
              >
                {movie.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DragDrop;