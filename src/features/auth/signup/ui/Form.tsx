import React from 'react';
import './SignupForm.scss';
import { Form as AntForm, Typography, Select, Modal } from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from 'shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from 'shared/ui/InputPasswordMelon/InputPasswordMelon';
import SelectMelon from 'shared/ui/SelectMelon/SelectMelon';
import CheckboxMelon from 'shared/ui/CheckboxMelon/CheckboxMelon';
import { userAuth } from 'entities/user/model/auth';
import { sellerAuth } from 'entities/user/model/authSeller';
import { authEndpoints } from 'shared/api/auth.endpoints';
import { IErr } from 'shared/api/types/interfaces';
import { ISignupFormData, Roles } from '../lib/types';

const { Title } = Typography;
const { Option } = Select;

export const Form: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = authEndpoints.useSignUpMutation();

  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };
  const className = classNames('signup-form');

  const register = async (values: ISignupFormData) => {
    const { email, password, role } = values;
    try {
      const res = await signUp({ email, password, role }).unwrap();
      Modal.info({
        title: 'Вы успешно зарегистрировались',
        // eslint-disable-next-line prettier/prettier
        content: `Ссылка подтверждения оправлена на почту ${res.message.split(' ').pop()}`,
        onOk: () => navigate('/signin'),
        okText: 'Войти',
      });
    } catch (err) {
      dispatch(userAuth.logout());
      dispatch(sellerAuth.logout());
      Modal.error({
        title: 'Упс! Кажется что-то пошло не так',
        content: `Error: ${
          (err as IErr)?.data?.message || 'Unresolved message'
        }`,
      });
    }
  };

  return (
    <AntForm
      onFinish={register}
      validateMessages={validateMessages}
      className={className}
    >
      <Title level={3}>{t('Create one')}</Title>
      <AntForm.Item
        name={['email']}
        label="E-mail"
        rules={[{ required: true, type: 'email' }]}
        className="signup-form__form-item"
      >
        <InputMelon type="email" placeholder="e-mail" />
      </AntForm.Item>
      <AntForm.Item
        name={['password']}
        label={t('Password')}
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
        <InputPasswordMelon type="password" minLength={8} maxLength={30} />
      </AntForm.Item>
      <AntForm.Item
        className="signup-form__form-item"
        name="confirm"
        label={t('Confirm password')}
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Пожалуйста, подтвердите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <InputPasswordMelon type="password" />
      </AntForm.Item>
      <AntForm.Item
        label={t('Role')}
        name={['role']}
        rules={[{ required: true }]}
        className="signup-form__form-item"
      >
        <SelectMelon>
          <Option value={Roles.SELLER}>{t('Seller')}</Option>
          <Option value={Roles.CLIENT}>{t('Customer')}</Option>
        </SelectMelon>
      </AntForm.Item>
      <AntForm.Item
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
          {t('Policy: Agreed')}{' '}
          <Link className="signup-form__link-rules" to="/welcome">
            {t('Rules')}
          </Link>
        </CheckboxMelon>
      </AntForm.Item>
      <AntForm.Item className="signup-form__form-item signup-form__submit-button">
        <ButtonMelon type="primary" htmlType="submit" loading={isLoading}>
          {t('Create one')}
        </ButtonMelon>
      </AntForm.Item>
      <p className="signup-form__signin-paragraph">
        {t('Have an account?')}{' '}
        <Link to="/signin" className="signup-form__signin-link">
          {t('Login')}
        </Link>
      </p>
    </AntForm>
  );
};
