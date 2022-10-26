import React, { useState } from 'react';
import { Form, Typography, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClient, setSeller } from '../../../../entities/user/model/role';
import { login, logout } from '../../../../entities/user/client/model/auth';
import {
  login as sellerLogin,
  logout as sellerLogout,
} from '../../../../entities/user/seller/model/auth';
import './SigninForm.scss';
import InputMelon from '../../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import authApi from '../../../../shared/api/auth';
import { ISigninFormValues } from '../lib/interfaces';
import { setIsFilled } from '../../../../entities/user/client/model/profile';

const { Title } = Typography;

const SigninForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);

  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };

  const onFinish = (values: ISigninFormValues) => {
    setIsSubmitButtonLoading(true);
    authApi
      .signin(values.email, values.password)
      .then((response) => {
        localStorage.setItem('JWT', response.accessToken);
        if (response.role === 'CLIENT') {
          localStorage.setItem('role', 'CLIENT');
          dispatch(sellerLogout());
          dispatch(setClient());
          dispatch(setIsFilled(false));
          dispatch(login());
        }
        if (response.role === 'SELLER') {
          localStorage.setItem('role', 'SELLER');
          dispatch(logout());
          dispatch(setSeller());
          dispatch(sellerLogin());
        }
        navigate('/categories');
      })
      .catch((err) => {
        Modal.error({
          title: 'Упс! Кажется что-то пошло не так',
          content: err.message,
        });
      })
      .finally(() => {
        setIsSubmitButtonLoading(false);
      });
  };

  return (
    <Form
      className="signin-form"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Title level={3}>Авторизация</Title>
      <Form.Item
        className="signin-form__form-item"
        name="email"
        label="E-mail"
        rules={[{ required: true, type: 'email' }]}
      >
        <InputMelon type="email" placeholder="Введите ваш e-mail" />
      </Form.Item>
      <Form.Item
        className="signin-form__form-item"
        name="password"
        label="Пароль"
        rules={[{ required: true }]}
      >
        <InputPasswordMelon type="password" />
      </Form.Item>

      <Form.Item className="signin-form__form-item signin-form__submit-button">
        <ButtonMelon
          type="primary"
          htmlType="submit"
          loading={isSubmitButtonLoading}
        >
          Войти
        </ButtonMelon>
      </Form.Item>
      <p className="signin-form__signup-paragraph">
        Еще не с нами?{' '}
        <Link to="/signup" className="signin-form__signin-link">
          Зарегистрироваться
        </Link>{' '}
      </p>
    </Form>
  );
};

export default SigninForm;
