/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import './SignupPage.scss';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Signup } from 'features/auth/signup';
import WatermelonSlice from 'shared/ui/WatermelonSlice/WatermelonSlice';
import { userStatus } from 'features/auth/user-status';
import { dom } from 'shared/lib';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';
import { useRecorder } from 'shared/modules/ux-stats';
// import { uxStats } from 'shared/modules/ux-stats';

const { Title } = Typography;

const SignupPage: React.FC = () => {
  dom.useTitle('Регистрация');
  const bemBlockName = classNames('signup-page');
  userStatus.useLoginNotification();

  const stop = useRecorder(500, 'Регистрация');

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
      <Signup.Form />
    </motion.div>
  );
};

export default SignupPage;
