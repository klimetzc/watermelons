import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Form, Modal } from 'antd';
import sellerApi from '../../../shared/api/seller';
import { ISellerPatch } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import './EditSellerButton.scss';

const EditSellerButton = () => {
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);
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

  const onFinish = (values: ISellerPatch) => {
    console.log(values);
    setIsSubmitButtonLoading(true);
    sellerApi
      .updateProfile(values)
      .then((res) => {
        console.log(res);
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
          <Form.Item label="Страна" name="country">
            <InputMelon />
          </Form.Item>
          <Form.Item label="E-mail" name="email">
            <InputMelon />
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

export default EditSellerButton;
