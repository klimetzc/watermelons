import React, { useEffect, useState } from 'react';
import './SignupForm.scss';
import { Form, Typography, Select, Modal } from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import SelectMelon from '../../../../shared/ui/SelectMelon/SelectMelon';
import CheckboxMelon from '../../../../shared/ui/CheckboxMelon/CheckboxMelon';
import authApi from '../../../../shared/api/auth';
import { login, logout } from '../../../../entities/user/model/auth';
import {
  login as sellerLogin,
  logout as sellerLogout,
} from '../../../../entities/user/seller/model/auth';

import { ISignupFormData, Roles } from '../model/types';
import type { RootState } from '../../../../app/store';

const { Title } = Typography;
const { Option } = Select;

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const dispatch = useDispatch();
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);
  const className = classNames('signup-form');
  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };

  const onFinish = (values: ISignupFormData) => {
    setIsSubmitButtonLoading(true);
    authApi
      .signup(values.email, values.password, values.role)
      .then((res) => {
        console.log('ok', res);
        localStorage.setItem('JWT', res.accessToken);
        localStorage.setItem('role', res.role);
        return res.role;
      })
      .then((role) => {
        if (role === 'CLIENT') {
          localStorage.setItem('role', 'CLIENT');
          dispatch(login());
        }
        if (role === 'SELLER') {
          localStorage.setItem('role', 'SELLER');
          dispatch(sellerLogin());
        }
        navigate('/categories');
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
        dispatch(sellerLogout());
        Modal.error({
          title: 'Упс! Кажется что-то пошло не так',
          content: err.message,
        });
      })
      .finally(() => {
        setIsSubmitButtonLoading(false);
      });
  };

  useEffect(() => {
    console.log('login state: ', isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <Form
      onFinish={onFinish}
      validateMessages={validateMessages}
      className={className}
    >
      <Title level={3}>Регистрация</Title>
      <Form.Item
        name={['email']}
        label="E-mail"
        rules={[{ required: true, type: 'email' }]}
        className="signup-form__form-item"
      >
        <InputMelon
          size="large"
          type="email"
          placeholder="Введите ваш e-mail"
        />
      </Form.Item>
      <Form.Item
        name={['password']}
        label="Пароль"
        rules={[
          {
            pattern: /^[a-zA-Z0-9]*$/,
            message: 'Пароль может содержать только латинские буквы и цифры',
          },
          {
            required: true,
            type: 'string',
            min: 8,
            max: 30,
          },
        ]}
        className="signup-form__form-item"
      >
        <InputPasswordMelon
          type="password"
          minLength={8}
          maxLength={30}
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Роль"
        name={['role']}
        rules={[{ required: true }]}
        className="signup-form__form-item"
      >
        <SelectMelon size="large">
          <Option value={Roles.SELLER}>Продавец</Option>
          <Option value={Roles.CLIENT}>Покупатель</Option>
        </SelectMelon>
      </Form.Item>
      <Form.Item
        name={['ok']}
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Вы должны принять соглашение')),
          },
        ]}
        valuePropName="checked"
        className="signup-form__form-item"
      >
        <CheckboxMelon>
          Соглашаюсь с{' '}
          <Link className="signup-form__link-rules" to="/welcome">
            правилами сообщества
          </Link>
        </CheckboxMelon>
      </Form.Item>
      <Form.Item className="signup-form__form-item signup-form__submit-button">
        <ButtonMelon
          size="large"
          type="primary"
          htmlType="submit"
          loading={isSubmitButtonLoading}
        >
          Зарегистрироваться
        </ButtonMelon>
      </Form.Item>
      <p className="signup-form__signin-paragraph">
        Уже зарегистрированы?{' '}
        <Link to="/signin" className="signup-form__signin-link">
          Войти
        </Link>
      </p>
    </Form>
  );
};

export default SignupForm;
