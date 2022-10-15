import React from 'react';
import { Navigate, Outlet } from 'react-router';

interface IPrivate {
  loginState: boolean | undefined;
}

const ProtectedRouteWrapper: React.FC<IPrivate> = ({ loginState }) =>
  loginState ? <Outlet /> : <Navigate to="/signin" />;

export default ProtectedRouteWrapper;
