import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './landing';
import SignupPage from './signup';
import SigninPage from './signin/SigninPage';
import type { RootState } from '../app/store';
import ProtectedRouteWrapper from '../shared/routes/ProtectedRoute';
import ClientProfiles from './clientProfile/ClientProfiles';
import BrowseCategories from './browseCategories/BrowseCategories';
import ProductPage from './productPage/ProductPage';
import PageNotFound from './pageNotFound/PageNotFound';
import BrowseProducts from './browseProducts/BrowseProducts';
import useCheckClient from '../features/auth/model/useCheckClient';

const RouterPages = () => {
  const { isLoading } = useCheckClient();

  const isClientLogged = useSelector<RootState, boolean>(
    (state) => state.userAuthReducer.isLoggedIn
  );

  useEffect(() => {
    console.log('ROUTER is client logged ib: ', isClientLogged);
  }, []);

  useEffect(() => {
    console.log('ROUTER is client logged ib: ', isClientLogged);
  }, [isClientLogged]);

  return isLoading ? (
    <Spin />
  ) : (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/welcome" element={<Landing />} />
      <Route path="/categories" element={<BrowseCategories />} />
      <Route path="/pageNotFound" element={<PageNotFound />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route element={<ProtectedRouteWrapper loginState={isClientLogged} />}>
        <Route path="/profile" element={<ClientProfiles />} />{' '}
      </Route>
      <Route path="*" element={<Navigate to="/pageNotFound" />} />
      <Route path="products" element={<BrowseProducts />} />
    </Routes>
  );
};

export default RouterPages;
