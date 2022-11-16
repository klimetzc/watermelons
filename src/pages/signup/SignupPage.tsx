import React from 'react';
import classNames from 'classnames';
import './SignupPage.scss';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import SignupForm from 'features/auth/signup/ui/SignupForm';
import WatermelonSlice from 'shared/ui/WatermelonSlice/WatermelonSlice';
import useLoginNotification from 'features/auth/user-status/lib/useLoginNotification';
import { dom } from 'shared/lib';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';

const { Title } = Typography;

const SignupPage: React.FC = () => {
  dom.useTitle('Регистрация');
  const bemBlockName = classNames('signup-page');
  useLoginNotification();

  return (
    <motion.div
      className={bemBlockName}
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
      <SignupForm />
    </motion.div>
  );
};

export default SignupPage;
