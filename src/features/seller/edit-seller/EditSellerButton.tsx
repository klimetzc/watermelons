import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  return (
    <>
      <ButtonMelon onClick={onClick} size="small">
        <EditOutlined />
      </ButtonMelon>

      <Modal
        title={t("Edit seller's profile")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<span>Watermelons</span>}
      >
        <Form onFinish={onFinish} className="edit-seller-button__form">
          <Form.Item label={t('Name')} name="name">
            <InputMelon />
          </Form.Item>
          <Form.Item label="E-mail" name="email">
            <InputMelon />
          </Form.Item>
          <Form.Item label={t("Company's email")} name="companyEmail">
            <InputMelon />
          </Form.Item>
          <Form.Item label={t('Country')} name="country">
            <InputMelon />
          </Form.Item>
          <Form.Item label={t('Address')} name="address">
            <InputMelon />
          </Form.Item>
          <Form.Item>
            <ButtonMelon
              htmlType="submit"
              type="primary"
              loading={isUpdateProfileLoading}
            >
              {t('Send')}
            </ButtonMelon>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditSellerButton;
