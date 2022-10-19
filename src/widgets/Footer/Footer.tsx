import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__info">
      <p className="footer__phone">911</p>
      <p className="footer__logo">Watermelons</p>
      <nav className="footer__socials">
        <Link to="/welcome">
          <div className="footer__socials-item footer__socials-vk" />
        </Link>
        <Link to="/welcome">
          <div className="footer__socials-item footer__socials-inst" />
        </Link>
        <Link to="/welcome">
          <div className="footer__socials-item footer__socials-ytbe" />
        </Link>
      </nav>
    </div>
    <p className="footer__copyright">© 2022 Компания “Арбузики”</p>
    <p className="footer__waring">
      Администрация Сайта не несет ответственности за размещаемые Пользователями
      материалы (в т.ч. информацию и изображения), их содержание и качество.
    </p>
  </footer>
);

export default Footer;
