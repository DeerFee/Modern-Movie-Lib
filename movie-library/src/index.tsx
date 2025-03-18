import React from 'react';
import ReactDOM from 'react-dom/client';
import { Library } from './ui/pages/Library';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Library />
    </React.StrictMode>
  );
}