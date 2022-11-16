import React from 'react';
import { useNavigate } from 'react-router';
import { Result } from 'antd';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import './PageNotFound.scss';
import { dom } from 'shared/lib';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';

const PageNotFound = () => {
  dom.useTitle('Упс! Страница не найдена');
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/categories');
  };

  return (
    <motion.div
      className="page-not-found"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimationVariants}
    >
      <Result
        status="404"
        title="404"
        subTitle="Извините, такой страницы не существует."
        extra={<ButtonMelon onClick={goBack}>Вернуться к покупкам</ButtonMelon>}
      />
    </motion.div>
  );
};

export default PageNotFound;
