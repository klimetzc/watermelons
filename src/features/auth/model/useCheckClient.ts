import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../../entities/user/model/auth';
import {
  login as sellerLogin,
  logout as sellerLogout,
} from '../../../entities/user/seller/model/auth';
import { RootState } from '../../../app/store';
import clientApi from '../../../shared/api/client';
import sellerApi from '../../../shared/api/seller';

export default function useCheckClient() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const isSellerLogged = useSelector<RootState>(
    (state) => state.sellerAuthReducer.isLoggedIn
  );
  const role = useSelector<RootState>((state) => state.roleReducer.role);

  useEffect(() => {
    console.log('хук подгрузки хедера запустился');
    if (!localStorage.getItem('JWT')) {
      setIsLoading(false);
      return;
    }
    if (
      !isClientLogged &&
      role !== 'SELLER' &&
      (role === 'CLIENT' || role === 'GHOST')
    ) {
      clientApi
        .getProfile(localStorage.getItem('JWT'))
        .then(() => {
          console.log('it is ok');
          dispatch(login());
        })
        .catch(() => {
          console.log('error');
          // localStorage.removeItem('JWT');
          dispatch(logout());
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (
      !isSellerLogged &&
      role !== 'CLIENT' &&
      (role === 'SELLER' || role === 'GHOST')
    ) {
      sellerApi
        .getProfile(localStorage.getItem('JWT'))
        .then(() => {
          console.log('it is ok');
          dispatch(sellerLogin());
        })
        .catch(() => {
          console.log('error');
          // localStorage.removeItem('JWT');
          dispatch(sellerLogout());
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
}
