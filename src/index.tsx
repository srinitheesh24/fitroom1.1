import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // your global styles if any

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
