import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  useEffect(() => {
    document.title = 'Watermelons';
  }, []);
  return (
    <div>
      Лендинг В разработке
      <Link to="/signin">Войти</Link>
      <Link to="/signup">Зарегистрироваться</Link>
      <Link to="/categories">Категории</Link>
    </div>
  );
};

export default Landing;
