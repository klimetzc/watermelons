import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './landing/Landing';
import SignupPage from './signup/Signup';
import SigninPage from './signin/SigninPage';
import type { RootState } from '../app/store';
import ProtectedRouteWrapper from './ProtectedRoute/ProtectedRoute';
import ClientProfiles from './clientProfile/ClientProfiles';
import BrowseCategories from './browseCategories/BrowseCategories';
import ProductPage from './productPage/ProductPage';
import PageNotFound from './pageNotFound/PageNotFound';
import BrowseProducts from './browseProducts/BrowseProducts';
import useCheckClient from '../features/auth/lib/useCheckClient';
import SpinFullPage from '../shared/ui/SpinFullPage/SpinFullPage';
import SellerDashboard from './SellerDashboard/SellerDashboard';
import BucketPage from './bucketPage/ui/BucketPage';
import Header from '../widgets/Header/Header';
import Footer from '../widgets/Footer/Footer';
import OrderPage from './OrderPage/OrderPage';

const RouterPages = () => {
  const { isLoading } = useCheckClient();

  const isClientLogged = useSelector<RootState, boolean>(
    (state) => state.userAuthReducer.isLoggedIn
  );

  const isSellerLogged = useSelector(
    (state: RootState) => state.sellerAuthReducer.isLoggedIn
  );

  return isLoading ? (
    <SpinFullPage />
  ) : (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<Landing />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        element={
          <>
            <Header /> <Outlet /> <Footer />
          </>
        }
      >
        <Route path="/categories" element={<BrowseCategories />} />
        <Route element={<ProtectedRouteWrapper loginState={isClientLogged} />}>
          <Route path="/profile" element={<ClientProfiles />} />
        </Route>
        <Route element={<ProtectedRouteWrapper loginState={isClientLogged} />}>
          <Route
            path="/profile/orders/:orderId"
            element={<OrderPage isForClient isForSeller={false} />}
          />
        </Route>
        <Route element={<ProtectedRouteWrapper loginState={isClientLogged} />}>
          <Route path="/bucket" element={<BucketPage />} />
        </Route>
        <Route element={<ProtectedRouteWrapper loginState={isSellerLogged} />}>
          <Route path="/dashboard" element={<SellerDashboard />} />
        </Route>
        <Route element={<ProtectedRouteWrapper loginState={isSellerLogged} />}>
          <Route
            path="/dashboard/orders/:orderId"
            element={<OrderPage isForSeller isForClient={false} />}
          />
        </Route>

        <Route
          path="/categories/:categoryId/products/:productId"
          element={<ProductPage />}
        />
        <Route
          path="/categories/:categoryId/products"
          element={<BrowseProducts />}
        />
      </Route>

      <Route path="/pageNotFound" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RouterPages;
