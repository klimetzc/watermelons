import React, { useEffect } from 'react';
import classNames from 'classnames';
import './Signup.scss';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import SignupForm from '../../features/auth/signup/ui/SignupForm';
import WatermelonSlice from '../../shared/ui/WatermelonSlice/WatermelonSlice';
import useLoginNotification from '../../features/auth/lib/useLoginNotification';

const { Title } = Typography;

const SignupPage: React.FC = () => {
  const bemBlockName = classNames('signup-page');
  useLoginNotification();

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  return (
    <div className={bemBlockName}>
      <WatermelonSlice />
      <Link to="/welcome" className={`${bemBlockName}__link`}>
        <Title className={`${bemBlockName}__page-title`}>Watermelons</Title>
      </Link>
      <div className={`${bemBlockName}__circle`} />
      <div className={`${bemBlockName}__watermelon-abstract`} />
      <div className={`${bemBlockName}__triangle`} />
      <SignupForm />
    </div>
  );
};

export default SignupPage;
