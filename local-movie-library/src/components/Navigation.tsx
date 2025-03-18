import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navigation: FC = () => {
  return (
    <nav className="navigation">
      <h1>Библиотека фильмов</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Все фильмы</Link>
        <Link to="/folders" className="nav-link">Папки</Link>
        <button className="add-button">Добавить фильм</button>
      </div>
    </nav>
  );
};

export default Navigation;