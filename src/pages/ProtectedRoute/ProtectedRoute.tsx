import React from 'react';
import { Outlet } from 'react-router';
import ForbiddenPage from '../Forbidden/ForbiddenPage';

interface IPrivate {
  loginState: boolean | undefined;
}

const ProtectedRouteWrapper: React.FC<IPrivate> = ({ loginState }) =>
  loginState ? <Outlet /> : <ForbiddenPage />;

export default ProtectedRouteWrapper;
