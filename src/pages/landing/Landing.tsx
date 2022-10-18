import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import WatermelonSlice from '../../shared/ui/WatermelonSlice/WatermelonSlice';
import './Landing.scss';

const Landing = () => {
  interface IFeature {
    name: string;
    desc: string;
    img: string;
  }
  const featuresHard: IFeature[] = [
    {
      name: 'Наша миссия',
      desc: 'Обеспечить безопасные и выгодные сделки между продавцом и покупателем',
      img: './static/images/feature-1.webp',
    },
    {
      name: 'Совместные закупки',
      desc: 'Объединившись, покупатели смогут выкупить товары по низкой цене со скидкой, а продавцы - реализуют сразу большие партии товаров',
      img: './static/images/feature-2.webp',
    },
    {
      name: 'Проверка товара до покупки',
      desc: 'Покупатель может удостовериться в подлинности товара, проверив серийный номер',
      img: './static/images/feature-3.webp',
    },
  ];

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
      <div className="landing-page__features">
        {featuresHard.map((feature) => (
          <div className="feature" key={feature.name}>
            <div className="feature__description">
              <h3>{feature.name}</h3>
              <p>{feature.desc}</p>
            </div>
            <div className="feature__img">
              <img src={feature.img} alt="" />
            </div>
          </div>
        ))}
      </div>
      <Link to="/categories">
        <ButtonMelon size="large">Перейти к покупкам</ButtonMelon>
      </Link>
      <footer>Тут будет футер</footer>
    </div>
  );
};

export default Landing;
