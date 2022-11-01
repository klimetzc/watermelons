import React from 'react';
import classNames from 'classnames';
import './SignupPage.scss';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import SignupForm from 'features/auth/signup/ui/SignupForm';
import WatermelonSlice from 'shared/ui/WatermelonSlice/WatermelonSlice';
import useLoginNotification from 'features/auth/user-status/lib/useLoginNotification';
import { dom } from 'shared/lib';

const { Title } = Typography;

const SignupPage: React.FC = () => {
  dom.useTitle('Регистрация');
  const bemBlockName = classNames('signup-page');
  useLoginNotification();

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
