import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import { RootState } from '../../../app/store/index';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

const useLoginNotification = () => {
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const isSellerLogged = useSelector(
    (state: RootState) => state.sellerAuthReducer.isLoggedIn
  );
  const navigate = useNavigate();

  useEffect(() => {
    const key = `open${Date.now()}`;

    if (isSellerLogged || isClientLogged) {
      notification.info({
        placement: 'topRight',
        key,
        btn: (
          <ButtonMelon
            type="primary"
            onClick={() => {
              notification.close(key);
              navigate('/welcome');
            }}
          >
            На главную
          </ButtonMelon>
        ),
        message: 'Вы уже авторизованы',
        description: `Вы вошли в аккаунт как ${
          isSellerLogged ? 'продавец' : ''
        }${
          isClientLogged ? 'покупатель' : ''
        }, возможно вы желаете перейти к приложению. При дальнейшей регистрации или авторизации вы автоматически выйдете из текущего аккаунта`,
        duration: 10,
      });
    }
  }, []);
};

export default useLoginNotification;
