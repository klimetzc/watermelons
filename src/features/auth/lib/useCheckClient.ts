import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../../entities/user/client/model/auth';
import { updateProfile } from '../../../entities/user/client/model/profile';
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
        .then((res) => {
          dispatch(login());
          dispatch(updateProfile(res));
        })
        .catch(() => {
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
          dispatch(sellerLogin());
        })
        .catch(() => {
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
