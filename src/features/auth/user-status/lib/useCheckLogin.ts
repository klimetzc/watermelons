import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userAuth } from '../../../../entities/user/model/auth';
import { clientProfileActions } from '../../../../entities/user/model/clientProfile';
import { sellerAuth } from '../../../../entities/user/model/authSeller';
import { RootState } from '../../../../app/store';
import clientApi from '../../../../shared/api/client';
import sellerApi from '../../../../shared/api/seller';

export default function useCheckLogin() {
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
          dispatch(userAuth.login());
          dispatch(clientProfileActions.updateProfile(res));
        })
        .catch(() => {
          dispatch(userAuth.logout());
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
          dispatch(sellerAuth.login());
        })
        .catch(() => {
          dispatch(sellerAuth.logout());
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
