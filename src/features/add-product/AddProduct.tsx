import { Form, Modal, Select } from 'antd';
import React, { useState } from 'react';
import sellerApi from '../../shared/api/seller';
import { IProductPost } from '../../shared/api/types/interfaces';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../shared/ui/InputMelon/InputMelon';
import SelectMelon from '../../shared/ui/SelectMelon/SelectMelon';

const { Option } = Select;

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);
  const onClick = () => {
    console.log('click');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: IProductPost) => {
    console.log(values);
    setIsSubmitButtonLoading(true);
    sellerApi
      .postProduct(values)
      .then((res) => {
        console.log(res);
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
      <ButtonMelon onClick={onClick}>Разместить продукт</ButtonMelon>

      <Modal
        title="Добавление товара"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<span>Арбузики</span>}
      >
        <Form onFinish={onFinish}>
          <Form.Item label="Название" name="title">
            <InputMelon />
          </Form.Item>
          <Form.Item label="Описание" name="description">
            <InputMelon />
          </Form.Item>
          <Form.Item label="Техническое описание" name="techDescription">
            <InputMelon />
          </Form.Item>
          <Form.Item label="Цена" name="price">
            <InputMelon type="number" />
          </Form.Item>
          <Form.Item label="Валюта" name="currency">
            <SelectMelon>
              <Option value="USD">USD</Option>
              <Option value="RUB">RUB</Option>
              <Option value="CNY">CNY</Option>
              <Option value="EUR">EUR</Option>
            </SelectMelon>
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

export default AddProduct;
