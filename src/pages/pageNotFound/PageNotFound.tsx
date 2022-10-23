import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Result } from 'antd';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import './PageNotFound.scss';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/categories');
  };

  useEffect(() => {
    document.title = 'Упс! Страница не найдена';
  }, []);

  return (
    <div className="page-not-found">
      <Result
        status="404"
        title="404"
        subTitle="Извините, такой страницы не существует."
        extra={<ButtonMelon onClick={goBack}>Вернуться к покупкам</ButtonMelon>}
      />
    </div>
  );
};

export default PageNotFound;
