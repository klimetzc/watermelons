import React, { useState } from 'react';
import { Form, Modal, Select } from 'antd';
import sellerApi from '../../../shared/api/seller';
import { IProduct, IProductPost } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import SelectMelon from '../../../shared/ui/SelectMelon/SelectMelon';
import './AddProduct.scss';

const { Option } = Select;

interface IAddProduct {
  products: IProduct[] | null;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
}

const AddProduct: React.FC<IAddProduct> = ({ products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] =
    useState<boolean>(false);

  const onClick = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: IProductPost) => {
    setIsSubmitButtonLoading(true);
    sellerApi
      .postProduct(values)
      .then((res: IProduct) => {
        const productsArray = products ? [...products] : [];
        productsArray.push(res);
        setProducts(productsArray);
        setIsModalOpen(false);
      })
      .catch((err) => {
        Modal.error({
          title: 'При добавлении товара произошла ошибка',
          content: err.message,
        });
      })
      .finally(() => {
        setIsSubmitButtonLoading(false);
      });
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
