import React, { useState } from 'react';
import { Form, message, Modal, Select } from 'antd';
import { IErr, IProductPost } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import SelectMelon from '../../../shared/ui/SelectMelon/SelectMelon';
import './AddProduct.scss';
import { sellerEndpoints } from '../../../shared/api/seller.endpoints';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [postProduct, { isLoading: isProductLoading }] =
    sellerEndpoints.useSellerProductMutation();

  const onClick = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: IProductPost) => {
    try {
      const product = await postProduct(values).unwrap();
      setIsModalOpen(false);
      message.success(`Товар ${product.title} размещен на продажу`);
    } catch (err) {
      Modal.error({
        title: 'При добавлении товара произошла ошибка',
        content: (err as IErr).message,
      });
    }
  };

  return (
    <>
      <ButtonMelon onClick={onClick} hasShadow>
        Разместить продукт
      </ButtonMelon>

      <Modal
        title="Добавление товара"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<span>Арбузики</span>}
      >
        <Form onFinish={onFinish} className="add-product__form">
          <Form.Item rules={[{ required: true }]} label="Название" name="title">
            <InputMelon />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Описание"
            name="description"
          >
            <InputMelon />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Техническое описание"
            name="techDescription"
          >
            <InputMelon />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Цена" name="price">
            <InputMelon min={1} type="number" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Категория товара"
            name="categoryId"
          >
            <SelectMelon>
              <Option value="1">Телефоны</Option>
              <Option value="2">Холодильники</Option>
            </SelectMelon>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Валюта"
            name="currency"
          >
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
              loading={isProductLoading}
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
