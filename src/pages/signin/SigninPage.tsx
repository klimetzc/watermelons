import React, { useEffect } from 'react';
import { Typography } from 'antd';
import SigninForm from '../../features/auth/signin/ui/SigninForm';
import WatermelonSlice from '../../shared/ui/WatermelonSlice/WatermelonSlice';
import './SigninPage.scss';

const { Title } = Typography;

const SigninPage: React.FC = () => {
  const bemBlockName = 'signin-page';

  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  return (
    <div className={`${bemBlockName}`}>
      <WatermelonSlice />
      <Title className={`${bemBlockName}__page-title`}>Watermelons</Title>
      <div className={`${bemBlockName}__circle`} />
      <div className={`${bemBlockName}__watermelon-abstract`} />
      <div className={`${bemBlockName}__triangle`} />
      <SigninForm />
    </div>
  );
};

export default SigninPage;
