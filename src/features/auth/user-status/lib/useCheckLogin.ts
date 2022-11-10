import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sellerEndpoints } from 'shared/api/seller.endpoints';
import { clientProfileActions } from 'entities/user/model/clientProfile';
import { RootState } from 'app/store/index';
import { userAuth } from 'entities/user/model/auth';
import { sellerAuth } from 'entities/user/model/authSeller';
import { clientEndpoints } from 'shared/api/client.endpoints';

export default function useCheckLogin() {
  const dispatch = useDispatch();
  const [clientQuery, { isLoading: isClientLoading }] =
    clientEndpoints.useLazyClientProfileQuery();
  const [sellerQuery, { isLoading: isSellerLoading }] =
    sellerEndpoints.useLazySellerProfileQuery();

  const [isLoading, setIsLoading] = useState<boolean>(
    isClientLoading || isSellerLoading
  );

  const role = useSelector<RootState>((state) => state.roleReducer.role);

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem('JWT')) {
      setIsLoading(false);
      return;
    }

    if (!localStorage.getItem('role')) {
      setIsLoading(false);
    }

    if (role === 'CLIENT' || role === 'GHOST') {
      clientQuery('').then((response) => {
        console.log('resp: ', response);
        if (response.isSuccess) {
          dispatch(userAuth.login());
          dispatch(clientProfileActions.updateProfile(response?.data));
        }
        if (response.isError) {
          dispatch(userAuth.logout());
          localStorage.removeItem('JWT');
          localStorage.removeItem('role');
        }
        if (!response.isLoading) {
          setIsLoading(false);
        }
      });
    }

    if (role === 'SELLER' || role === 'GHOST') {
      sellerQuery('').then((response) => {
        console.log('resp: ', response);
        if (response.isSuccess) {
          dispatch(sellerAuth.login());
        }
        if (response.isError) {
          dispatch(sellerAuth.logout());
          localStorage.removeItem('JWT');
          localStorage.removeItem('role');
        }
        if (!response.isLoading) {
          setIsLoading(false);
        }
      });
    }
  }, []);

  return { isLoading };
}
