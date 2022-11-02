import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Form, Modal } from 'antd';
import { IErr, ISellerPatch } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import './EditSellerButton.scss';
import { sellerEndpoints } from '../../../shared/api/seller.endpoints';

const EditSellerButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    sellerEndpoints.useSellerUpdateProfileMutation();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values: ISellerPatch) => {
    try {
      updateProfile(values).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      Modal.error({
        title: 'При обновлении профиля произошла ошибка',
        content: (err as IErr).message,
      });
    }
  };

  return (
    <>
      <ButtonMelon onClick={onClick} size="small">
        <EditOutlined />
      </ButtonMelon>

      <Modal
        title="Редактирование профиля продавца"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<span>Арбузики</span>}
      >
        <Form onFinish={onFinish} className="edit-seller-button__form">
          <Form.Item label="Имя" name="name">
            <InputMelon />
          </Form.Item>
          <Form.Item label="E-mail" name="email">
            <InputMelon />
          </Form.Item>
          <Form.Item label="E-mail компании" name="companyEmail">
            <InputMelon />
          </Form.Item>
          <Form.Item label="Страна" name="country">
            <InputMelon />
          </Form.Item>
          <Form.Item label="Адрес" name="address">
            <InputMelon />
          </Form.Item>
          <Form.Item>
            <ButtonMelon
              htmlType="submit"
              type="primary"
              loading={isUpdateProfileLoading}
            >
              Отправить
            </ButtonMelon>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditSellerButton;
