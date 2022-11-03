import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAuth } from '../../../../entities/user/model/auth';
import { sellerAuth } from '../../../../entities/user/model/authSeller';
// import { RootState } from '../../../../app/store';
import { clientEndpoints } from '../../../../shared/api/client.endpoints';
import { sellerEndpoints } from '../../../../shared/api/seller.endpoints';

export default function useCheckLogin() {
  const dispatch = useDispatch();
  const {
    isLoading: isClientLoading,
    isSuccess: isClientSuccess,
    isError: isClientError,
  } = clientEndpoints.useClientProfileQuery('');
  const {
    isLoading: isSellerLoading,
    isSuccess: isSellerSuccess,
    isError: isSellerError,
  } = sellerEndpoints.useSellerProfileQuery('');

  const [isLoading, setIsLoading] = useState<boolean>(
    isClientLoading || isSellerLoading
  );

  useEffect(() => {
    // console.log(isClientSuccess, isClientError, isClientLoading);
    if (isClientError) {
      // console.log('client error');
      dispatch(userAuth.logout());
    }
    if (isSellerError) {
      // console.log('seller error');
      dispatch(sellerAuth.logout());
    }
    if (isClientSuccess) {
      // console.log('client success');
      dispatch(userAuth.login());
    }
    if (isSellerSuccess) {
      // console.log('seller success');
      dispatch(sellerAuth.login());
    }
    if (!isClientLoading || !isSellerLoading) {
      setIsLoading(false);
    }
  }, [isClientLoading, isSellerLoading]);

  return { isLoading };
}
