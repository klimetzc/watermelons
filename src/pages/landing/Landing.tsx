/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import image1 from 'shared/assets/images/mission.webp';
import image2 from 'shared/assets/images/groupbuy.png';
import image3 from 'shared/assets/images/checkProduct.jpg';
import './Landing.scss';
import Footer from 'widgets/Footer/Footer';
import { dom } from 'shared/lib';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

interface IFeature {
  name: string;
  desc: string;
  img: string;
}

const Landing = () => {
  const { t } = useTranslation();
  const featuresHard: IFeature[] = [
    {
      name: t('Goal'),
      desc: t('Goal desc'),
      img: image1,
    },
    {
      name: t('Collabs'),
      desc: t('Collabs Landing'),
      img: image2,
    },
    {
      name: t('Product check'),
      desc: t('Product check Landing'),
      img: image3,
    },
  ];
  dom.useTitle('Watermelons');

  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <h1 className="landing-page__title">Watermelons</h1>
        <nav className="landing-page__nav">
          <Link to="/categories" className="landing-page__nav-link">
            {t('Shop')}
          </Link>
          <Link to="/categories" className="landing-page__nav-link">
            {t('Supplier')}
          </Link>
          <Link to="/categories" className="landing-page__nav-link">
            {t('Contacts')}
          </Link>
        </nav>
        <Link to="/signin" className="landing-page__signin">
          <LoginOutlined />
        </Link>
      </header>
      <Marquee
        className="landing-page__marquee"
        speed={30}
        gradientColor={
          localStorage.getItem('darkThemeEnabled') ? [15, 15, 15] : [15, 15, 15]
          // 248 249 253
        }
      >
        {' '}
        Black friday: До 30 ноября купи два iPhone18 и получи кепку в подарок.
        Участвуй в совместных закупках, и каждый день будет как Черная пятница!
      </Marquee>

      <div className="landing-page__intro">
        <h2 className="landing-page__slogan">
          {t('Solution')}
          {/* SOLUTION
          <br />
          THAT WORKS
          <br />
          FOR YOU */}
        </h2>
        <div className="landing-page__welcome-btn">
          {t('Parallel import marketplace')}
        </div>
        <Link to="/signup" className="landing-page__join-us">
          {/* JOIN
          <br /> US
          <br /> NOW
          <br /> */}
          {t('Join us')}
        </Link>
        <div className="landing-page__client-feedback">
          <div className="landing-page__client-photo" />
          <Rate value={4.5} allowHalf disabled />
          <p className="landing-page__client-paragraph">
            <span className="landing-page__client-quantity">3500+</span>{' '}
            {t('Customer reviews')}
          </p>
          <p className="landing-page__client-average-rate">
            4.6 {t('average')}
          </p>
        </div>
        <p className="landing-page__bootcamp">
          <span className="landing-page__bootcamp_red">RED_MAD_</span>ROBOT
          <br />
          BOOTCAMP
        </p>

        <div className="landing-page__watermelon" />

        <div className="landing-page__quantity-products">
          <h3 className="landing-page__quantity-products-title">1000+</h3>
          <p className="landing-page__quantity-products-paragraph">
            {t('Around the world')}
          </p>
        </div>
      </div>

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
          {t('Catalogue')}
        </ButtonMelon>
      </Link>
      <Footer />
    </div>
  );
};

export default Landing;
