import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store/index';
import { userAuth } from '../../../../entities/user/model/auth';
import { sellerAuth } from '../../../../entities/user/model/authSeller';
import { clientEndpoints } from '../../../../shared/api/client.endpoints';
import { sellerEndpoints } from '../../../../shared/api/seller.endpoints';

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
      clientQuery('')
        .then(() => {
          dispatch(userAuth.login());
        })
        .catch(() => {
          dispatch(userAuth.logout());
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (role === 'SELLER' || role === 'GHOST') {
      sellerQuery('')
        .then(() => {
          dispatch(sellerAuth.login());
        })
        .catch(() => {
          dispatch(sellerAuth.logout());
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return { isLoading };
}
