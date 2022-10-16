import React, { useState } from 'react';
import { Form, Typography, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClient, setSeller } from '../../../../entities/user/role';
import { login } from '../../../../entities/user/model/auth';
import { login as sellerLogin } from '../../../../entities/user/seller/model/auth';
import './SigninForm.scss';
import InputMelon from '../../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import authApi from '../../../../shared/api/auth';

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

  interface ISigninFormValues {
    email: string;
    password: string;
  }

  const onFinish = (values: ISigninFormValues) => {
    setIsSubmitButtonLoading(true);
    authApi
      .signin(values.email, values.password)
      .then((response) => {
        localStorage.setItem('JWT', response.accessToken);
        if (response.role === 'CLIENT') {
          dispatch(setClient());
          dispatch(login());
        }
        if (response.role === 'SELLER') {
          dispatch(setSeller());
          dispatch(sellerLogin());
        }
        console.log('login completed as:', response.role);
        navigate('/categories');
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: 'Что-то пошло не так',
          content: `${err.status} - ${err.error}`,
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
        <InputMelon
          size="large"
          type="email"
          placeholder="Введите ваш e-mail"
        />
      </Form.Item>
      <Form.Item
        className="signin-form__form-item"
        name="password"
        label="Пароль"
        rules={[{ required: true }]}
      >
        <InputPasswordMelon type="password" size="large" />
      </Form.Item>

      <Form.Item className="signin-form__form-item signin-form__submit-button">
        <ButtonMelon
          size="large"
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
