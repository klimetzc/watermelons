import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './landing';
import SignupPage from './signup';

interface IRoute {
  name?: string;
  path: string;
  Component: React.ReactNode;
}

const routes: IRoute[] = [
  { path: '/', Component: <Navigate to="/welcome" /> },
  { path: '/signup', Component: <SignupPage /> },
  { path: '/welcome', Component: <Landing /> },
  { path: '*', Component: <Navigate to="/welcome" /> }, // Нужна 404 страница
];

function Router() {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  );
}

export default Router;
