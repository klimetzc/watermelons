import React, { useEffect } from 'react';
import classNames from 'classnames';
import './Signup.scss';
import { Typography } from 'antd';
import SignupForm from '../../features/auth/signup/ui/SignupForm';
import WatermelonSlice from '../../shared/ui/WatermelonSlice/WatermelonSlice';

const { Title } = Typography;

const SignupPage: React.FC = () => {
  const bemBlockName = classNames('signup-page');

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  return (
    <div className={bemBlockName}>
      <WatermelonSlice />
      <Title className={`${bemBlockName}__page-title`}>Watermelons</Title>
      <div className={`${bemBlockName}__circle`} />
      <div className={`${bemBlockName}__watermelon-abstract`} />
      <div className={`${bemBlockName}__triangle`} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
