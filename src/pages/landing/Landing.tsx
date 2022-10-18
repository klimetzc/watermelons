import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import WatermelonSlice from '../../shared/ui/WatermelonSlice/WatermelonSlice';
import './Landing.scss';

const Landing = () => {
  useEffect(() => {
    document.title = 'Watermelons';
  }, []);
  return (
    <div className="landing-page">
      <WatermelonSlice />
      <h1 className="landing-page__title">Watermelons</h1>
      <nav className="landing-page__nav">
        <Link to="/signin">
          <ButtonMelon>Войти</ButtonMelon>{' '}
        </Link>
        <Link to="/signup">
          <ButtonMelon type="primary">Зарегистрироваться</ButtonMelon>
        </Link>
      </nav>

      <Link to="/categories">
        <ButtonMelon size="large">Перейти к покупкам</ButtonMelon>
      </Link>
      <p className="landing-page__slogan">
        Мы делаем любимые вещи доступнее для каждого
      </p>
    </div>
  );
};

export default Landing;
