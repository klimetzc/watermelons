import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import { useSelector } from 'react-redux';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../shared/ui/InputMelon/InputMelon';
import type { RootState } from '../../app/store';

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
    // console.log('click edit');
    // Modal
    setIsModalOpen(true);
  };
  const onFinish = (values: IUserData) => {
    console.log(values);
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
          onFinish={onFinish}
          initialValues={{
            name: currentUserData.name || '',
            surname: currentUserData?.surname || '',
            family: currentUserData?.family || '',
            phone: currentUserData?.phone ? +currentUserData.phone : '',
            address: currentUserData?.name || '',
          }}
        >
          <Form.Item label="name" name="name" rules={[{ required: true }]}>
            <InputMelon />
          </Form.Item>
          <Form.Item
            label="surname"
            name="surname"
            rules={[{ required: true }]}
          >
            <InputMelon />
          </Form.Item>
          <Form.Item
            label="address"
            name="address"
            rules={[{ required: true }]}
          >
            <InputMelon />
          </Form.Item>
          <Form.Item label="phone" name="phone" rules={[{ required: true }]}>
            <InputMelon type="number" />
          </Form.Item>
          <Form.Item label="family" name="family" rules={[{ required: true }]}>
            <InputMelon />
          </Form.Item>
          <Form.Item>
            <ButtonMelon htmlType="submit" type="primary">
              Отправить
            </ButtonMelon>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProfile;
