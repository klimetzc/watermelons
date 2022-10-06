import React from 'react';
import WithRouter from './providers';
import Router from '../pages';
import './index.scss';

function App() {
  return (
    <WithRouter
      component={
        <div className="app">
          <Router />
        </div>
      }
    />
  );
}

export default App;
