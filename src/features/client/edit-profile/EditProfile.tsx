import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../entities/user/client/model/profile';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import type { RootState } from '../../../app/store';
import clientApi from '../../../shared/api/client';
import './EditProfile.scss';

interface IUserData {
  name: string;
  surname: string;
  family: string;
  address: string;
  phone: number | string;
}

// interface IEditProfile {
//   currentUserData: IUserData | null;
// }

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);
  const currentUserData = useSelector(
    (state: RootState) => state.clientProfileReducer.userdata
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onClick = () => {
    setIsModalOpen(true);
  };
  const onFinish = (values: IUserData) => {
    console.log(values);
    setIsSubmitButtonLoading(true);
    clientApi
      .updateProfile(values)
      .then(() => {
        dispatch(updateProfile(values));
      })
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitButtonLoading(true);
      });
    // setIsModalOpen(false);
  };

  return (
    <>
      <ButtonMelon onClick={onClick}>Edit</ButtonMelon>{' '}
      <Modal
        title="Редактирование профиля"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<span key="Watermelons">Арбузики</span>]}
      >
        <Form
          className="edit-profile__form"
          onFinish={onFinish}
          initialValues={{
            name: currentUserData.name || '',
            surname: currentUserData?.surname || '',
            family: currentUserData?.family || '',
            phone: currentUserData?.phone ? +currentUserData.phone : '',
            address: currentUserData?.name || '',
          }}
        >
          <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
            <InputMelon />
          </Form.Item>
          <Form.Item label="Фамилия" name="family" rules={[{ required: true }]}>
            <InputMelon />
          </Form.Item>
          <Form.Item
            label="Отчество"
            name="surname"
            rules={[{ required: true }]}
          >
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
    </>
  );
};

export default EditProfile;
