import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import SigninForm from 'features/auth/signin/ui/SigninForm';
import WatermelonSlice from 'shared/ui/WatermelonSlice/WatermelonSlice';
import './SigninPage.scss';
import useLoginNotification from 'features/auth/user-status/lib/useLoginNotification';
import { dom } from 'shared/lib';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';

const { Title } = Typography;

const SigninPage: React.FC = () => {
  dom.useTitle('Авторизация');
  const bemBlockName = 'signin-page';
  useLoginNotification();

  return (
    <motion.div
      className={`${bemBlockName}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimationVariants}
    >
      <WatermelonSlice />
      <Link to="/welcome" className={`${bemBlockName}__link`}>
        <Title className={`${bemBlockName}__page-title`}>Watermelons</Title>
      </Link>
      <div className={`${bemBlockName}__circle`} />
      <div className={`${bemBlockName}__watermelon-abstract`} />
      <div className={`${bemBlockName}__triangle`} />
      <SigninForm />
    </motion.div>
  );
};

export default SigninPage;
