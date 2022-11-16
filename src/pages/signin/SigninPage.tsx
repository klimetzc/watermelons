import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Signin } from 'features/auth/signin';
import WatermelonSlice from 'shared/ui/WatermelonSlice/WatermelonSlice';
import './SigninPage.scss';
import { userStatus } from 'features/auth/user-status';
import { dom } from 'shared/lib';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';

const { Title } = Typography;

const SigninPage: React.FC = () => {
  dom.useTitle('Авторизация');
  const bemBlockName = 'signin-page';
  userStatus.useLoginNotification();

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
      <Signin.Form />
    </motion.div>
  );
};

export default SigninPage;
