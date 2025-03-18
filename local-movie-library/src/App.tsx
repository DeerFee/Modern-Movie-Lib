import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navigation from './components/Navigation';
import MovieList from './components/MovieList';
import store from './store';
import './App.css';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navigation />
          <main>
            <MovieList />
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;