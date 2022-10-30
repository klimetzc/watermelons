import React, { lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import useCheckLogin from '../features/auth/user-status/lib/useCheckLogin';

const Landing = lazy(() => import('./landing/Landing'));
const SignupPage = lazy(() => import('./signup/SignupPage'));
const SigninPage = lazy(() => import('./signin/SigninPage'));
const ProtectedRouteWrapper = lazy(
  () => import('./ProtectedRoute/ProtectedRoute')
);
const ClientProfile = lazy(() => import('./clientProfile/ClientProfiles'));
const BrowseCategories = lazy(
  () => import('./browseCategories/BrowseCategories')
);
const ProductPage = lazy(() => import('./productPage/ProductPage'));
const PageNotFound = lazy(() => import('./pageNotFound/PageNotFound'));
const BrowseProducts = lazy(() => import('./browseProducts/BrowseProducts'));
const SpinFullPage = lazy(
  () => import('../shared/ui/SpinFullPage/SpinFullPage')
);
const SellerDashboard = lazy(() => import('./SellerDashboard/SellerDashboard'));
const BucketPage = lazy(() => import('./bucketPage/BucketPage'));
const Header = lazy(() => import('../widgets/Header/Header'));
const Footer = lazy(() => import('../widgets/Footer/Footer'));
const OrderPage = lazy(() => import('./OrderPage/OrderPage'));

const RouterPages = () => {
  const { isLoading } = useCheckLogin();

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
          <Route path="/profile" element={<ClientProfile />} />
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
