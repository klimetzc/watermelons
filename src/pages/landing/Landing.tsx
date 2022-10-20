/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import WatermelonSlice from '../../shared/ui/WatermelonSlice/WatermelonSlice';
import image1 from '../../shared/assets/images/mission.webp';
import image2 from '../../shared/assets/images/groupbuy.png';
import image3 from '../../shared/assets/images/checkProduct.jpg';
import './Landing.scss';
import Footer from '../../widgets/Footer/Footer';

interface IFeature {
  name: string;
  desc: string;
  img: string;
}

const featuresHard: IFeature[] = [
  {
    name: 'Наша миссия',
    desc: 'Обеспечить безопасные и выгодные сделки между продавцом и покупателем',
    img: image1,
  },
  {
    name: 'Совместные закупки',
    desc: 'Объединившись, покупатели смогут выкупить товары по низкой цене со скидкой, а продавцы - реализовать сразу большие партии товаров',
    img: image2,
  },
  {
    name: 'Проверка товара',
    desc: 'Покупатель может удостовериться в подлинности товара, проверив серийный номер ещё до совершения покупки',
    img: image3,
  },
];

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
      <div className="landing-page__features">
        {featuresHard.map((feature) => (
          <div className="landing-feature" key={feature.name}>
            <div className="landing-feature__description">
              <h3 className="landing-feature__title">{feature.name}</h3>
              <p className="landing-feature__paragraph">{feature.desc}</p>
            </div>
            <div className="landing-feature__img-box">
              <img className="landing-feature__img" src={feature.img} alt="" />
            </div>
          </div>
        ))}
      </div>
      <Link to="/categories">
        <ButtonMelon size="large">Перейти к покупкам</ButtonMelon>
      </Link>
      <Footer />
    </div>
  );
};

export default Landing;
