import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userAuth } from '../../../../entities/user/model/auth';
import { sellerAuth } from '../../../../entities/user/model/authSeller';
import { RootState } from '../../../../app/store';
import { clientEndpoints } from '../../../../shared/api/client.endpoints';
import { sellerEndpoints } from '../../../../shared/api/seller.endpoints';

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
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: client } = clientEndpoints.useClientProfileQuery('');
        dispatch(userAuth.login());
      } catch (error) {
        dispatch(userAuth.logout());
        setIsLoading(false);
      }
    } else if (
      !isSellerLogged &&
      role !== 'CLIENT' &&
      (role === 'SELLER' || role === 'GHOST')
    ) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: seller } = sellerEndpoints.useSellerProfileQuery('');
        dispatch(sellerAuth.login());
      } catch (error) {
        dispatch(sellerAuth.logout());
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
}
