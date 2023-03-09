import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/index';
import reportWebVitals from './reportWebVitals';
import './app/providers/i18n.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
