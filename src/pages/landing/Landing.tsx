/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
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
      {/* <WatermelonSlice /> */}
      <header className="landing-page__header">
        <h1 className="landing-page__title">Watermelons</h1>
        <nav className="landing-page__nav">
          <Link to="/welcome" className="landing-page__nav-link">
            Главная
          </Link>
          <Link to="/categories" className="landing-page__nav-link">
            Магазин
          </Link>
          <Link to="/categories" className="landing-page__nav-link">
            О нас
          </Link>
          <Link to="/categories" className="landing-page__nav-link">
            Контакты
          </Link>
        </nav>
        <Link to="/signin" className="landing-page__signin">
          <LoginOutlined />
        </Link>
      </header>

      <div className="landing-page__intro">
        <p className="landing-page__bootcamp">
          <span className="landing-page__bootcamp_red">RED_MAD_ROBOT</span>
          <br />
          BOOTCAMP
        </p>
        <Link to="/signup" className="landing-page__join-us">
          JOIN
          <br /> US
          <br /> NOW
          <br />
        </Link>
        <div className="landing-page__client-feedback">
          <div className="landing-page__client-photo" />
          <Rate value={4.5} allowHalf disabled />
          <p className="landing-page__client-paragraph">
            <span className="landing-page__client-quantity">3500+</span> отзывов
            клиентов
          </p>
          <p className="landing-page__client-average-rate">4.6 средний</p>
        </div>
        <div className="landing-page__watermelon" />
        <div className="landing-page__welcome-btn">
          Маркетплейс параллельного импорта
        </div>
        <h2 className="landing-page__slogan">
          SOLUTION
          <br />
          THAT WORKS
          <br />
          FOR YOU
        </h2>
        <div className="landing-page__quantity-products">
          <h3 className="landing-page__quantity-products-title">1000+</h3>
          <p className="landing-page__quantity-products-paragraph">
            Ваших любимых и привычных вещей со всех уголков планеты!
          </p>
        </div>
      </div>

      {/* <Link to="/categories">
        <ButtonMelon hasShadow size="large">
          Перейти к покупкам
        </ButtonMelon>
      </Link> */}
      {/* <p className="landing-page__slogan">
        Мы делаем любимые вещи доступнее для каждого
      </p> */}
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
        <ButtonMelon hasShadow size="large">
          Перейти к покупкам
        </ButtonMelon>
      </Link>
      <Footer />
    </div>
  );
};

export default Landing;
