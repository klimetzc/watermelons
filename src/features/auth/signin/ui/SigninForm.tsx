import React from 'react';
import { Form, Typography, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { roleActions } from '../../../../entities/user/model/role';
import { userAuth } from '../../../../entities/user/model/auth';
import { sellerAuth } from '../../../../entities/user/model/authSeller';
import './SigninForm.scss';
import InputMelon from '../../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import { ISigninFormValues } from '../lib/interfaces';
import { clientProfileActions } from '../../../../entities/user/model/clientProfile';
import { authEndpoints } from '../../../../shared/api/auth.endpoints';
import { IErr, IUserData } from '../../../../shared/api/types/interfaces';

const { Title } = Typography;

const SigninForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = authEndpoints.useSignInMutation();

  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };

  const setUserRole = ({ role }: IUserData) => {
    if (role === 'CLIENT') {
      localStorage.setItem('role', 'CLIENT');
      dispatch(sellerAuth.logout());
      dispatch(roleActions.setClient());
      dispatch(clientProfileActions.setIsFilled(false));
      dispatch(userAuth.login());
    }
    if (role === 'SELLER') {
      localStorage.setItem('role', 'SELLER');
      dispatch(userAuth.logout());
      dispatch(roleActions.setSeller());
      dispatch(sellerAuth.login());
    }
  };

  const login = async (values: ISigninFormValues) => {
    const { email, password } = values;
    try {
      const userData: IUserData = await signIn({ email, password }).unwrap();
      localStorage.setItem('JWT', userData.accessToken);

      setUserRole(userData);
      navigate('/categories');
    } catch (err) {
      Modal.error({
        title: 'Упс! Кажется что-то пошло не так',
        content: (err as IErr).message,
      });
    }
  };

  return (
    <Form
      className="signin-form"
      validateMessages={validateMessages}
      onFinish={login}
    >
      <Title level={3}>{t('Authorization')}</Title>
      <Form.Item
        className="signin-form__form-item"
        name="email"
        label="E-mail"
        rules={[{ required: true, type: 'email' }]}
      >
        <InputMelon type="email" placeholder="e-mail" />
      </Form.Item>
      <Form.Item
        className="signin-form__form-item"
        name="password"
        label={t('Password')}
        rules={[{ required: true }]}
      >
        <InputPasswordMelon type="password" />
      </Form.Item>

      <Form.Item className="signin-form__form-item signin-form__submit-button">
        <ButtonMelon type="primary" htmlType="submit" loading={isLoading}>
          {t('Login')}
        </ButtonMelon>
      </Form.Item>
      <p className="signin-form__signup-paragraph">
        {t('Dont have an account?')}{' '}
        <Link to="/signup" className="signin-form__signin-link">
          {t('Create one')}
        </Link>{' '}
      </p>
    </Form>
  );
};

export default SigninForm;
