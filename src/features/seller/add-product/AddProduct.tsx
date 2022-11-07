import React, { useState } from 'react';
import { Form, message, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { IErr, IProductPost } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import SelectMelon from '../../../shared/ui/SelectMelon/SelectMelon';
import './AddProduct.scss';
import { sellerEndpoints } from '../../../shared/api/seller.endpoints';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const { t } = useTranslation();
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
      message.success(`${product.title} ${t('Order created')}`);
    } catch (err) {
      Modal.error({
        title: t('Error'),
        content: (err as IErr).message,
      });
    }
  };

  return (
    <>
      <ButtonMelon onClick={onClick} hasShadow>
        {t('Place product')}
      </ButtonMelon>

      <Modal
        title={t('Add product modal')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<span>Watermelons</span>}
      >
        <Form onFinish={onFinish} className="add-product__form">
          <Form.Item
            rules={[{ required: true }]}
            label={t('Product name')}
            name="title"
          >
            <InputMelon />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label={t('Description')}
            name="description"
          >
            <InputMelon />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label={t('Technical description')}
            name="techDescription"
          >
            <InputMelon />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label={t('Price')}
            name="price"
          >
            <InputMelon min={1} type="number" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label={t('Product category')}
            name="categoryId"
          >
            <SelectMelon>
              <Option value="1">{t('Phones')}</Option>
              <Option value="2">{t('Refrigerators')}</Option>
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
              {t('Send')}
            </ButtonMelon>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
