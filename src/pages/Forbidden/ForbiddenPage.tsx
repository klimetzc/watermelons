import React, { useState, useEffect } from 'react';
import { Result } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import './ForbiddenPage.scss';

const ForbiddenPage = () => {
  const role = useSelector((state: RootState) => state.roleReducer.role);
  const [roleHumanReadable, setRoleHumanReadable] =
    useState<string>('Неавторизованный');

  useEffect(() => {
    switch (role) {
      case 'GHOST':
        setRoleHumanReadable('Неавторизованный');
        break;
      case 'CLIENT':
        setRoleHumanReadable('Покупатель');
        break;
      case 'SELLER':
        setRoleHumanReadable('Покупатель');
        break;
      default:
        setRoleHumanReadable('Неавторизованный');
        break;
    }
  }, []);

  return (
    <Result
      status="403"
      title="403"
      subTitle={`Извините, посещение страницы для роли "${roleHumanReadable}" запрещено`}
      extra={
        <>
          <h3>Вы можете: </h3>
          <nav className="forbidden-page__nav">
            <div className="forbidden-page__buttons">
              <Link to="/signin">
                <ButtonMelon>Авторизоваться</ButtonMelon>
              </Link>
              <Link to="/signup">
                <ButtonMelon type="primary">Зарегистрироваться</ButtonMelon>
              </Link>
            </div>
            <Link to="/categories">Вернутся к просмотру товаров</Link>
          </nav>
        </>
      }
    />
  );
};

export default ForbiddenPage;
