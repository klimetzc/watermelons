import React from 'react';
import { useNavigate } from 'react-router';
import { Result } from 'antd';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import './PageNotFound.scss';
import { dom } from '../../shared/lib';

const PageNotFound = () => {
  dom.useTitle('Упс! Страница не найдена');
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/categories');
  };

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
