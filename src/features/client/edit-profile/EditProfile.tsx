import React, { useState } from 'react';
import { Avatar, Form, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { clientProfileActions } from '../../../entities/user/model/clientProfile';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import type { RootState } from '../../../app/store';
import clientApi from '../../../shared/api/client';
import './EditProfile.scss';
import IUserData from './lib/interfaces';

interface IEditProfile {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
}

const EditProfile: React.FC<IEditProfile> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);
  const currentUserData = useSelector(
    (state: RootState) => state.clientProfileReducer.userdata
  );

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: IUserData) => {
    setIsSubmitButtonLoading(true);
    clientApi
      .updateProfile(values)
      .then(() => {
        dispatch(clientProfileActions.updateProfile(values));
        dispatch(clientProfileActions.setIsFilled(true));
      })
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitButtonLoading(false);
      });
  };

  return (
    <Modal
      title="Редактирование профиля"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[<span key="Watermelons">Арбузики</span>]}
      className="edit-profile"
    >
      <Avatar
        className="edit-profile__avatar"
        size={150}
        src="https://img.freepik.com/free-photo/attractive-curly-woman-purple-cashmere-sweater-fuchsia-sunglasses-poses-isolated-wall_197531-24158.jpg?w=1380&t=st=1666607179~exp=1666607779~hmac=3bce6fca4329adcd9fc0c6a00b316fbab2e15a7127560790b779450369b16eb8"
      />
      <Form
        className="edit-profile__form"
        onFinish={onFinish}
        initialValues={{
          name: currentUserData.name || '',
          surname: currentUserData?.surname || '',
          family: currentUserData?.family || '',
          phone: currentUserData?.phone ? +currentUserData.phone : '',
          address: currentUserData?.address || '',
        }}
      >
        <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Фамилия" name="family" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Отчество" name="surname" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Адрес" name="address" rules={[{ required: true }]}>
          <InputMelon />
        </Form.Item>
        <Form.Item label="Номер" name="phone" rules={[{ required: true }]}>
          <InputMelon type="number" />
        </Form.Item>

        <Form.Item>
          <ButtonMelon
            htmlType="submit"
            type="primary"
            loading={isSubmitButtonLoading}
          >
            Отправить
          </ButtonMelon>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfile;
