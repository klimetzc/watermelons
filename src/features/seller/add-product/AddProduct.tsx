import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, message, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment/moment';
import { IErr, IProductPost } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import SelectMelon from '../../../shared/ui/SelectMelon/SelectMelon';
import './AddProduct.scss';
import { sellerEndpoints } from '../../../shared/api/seller.endpoints';
import SwitchMelon from '../../../shared/ui/SwitchMelon/SwitchMelon';
import DatePickerMelon from '../../../shared/ui/DatePickerMelon/DatePickerMelon';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isJointPurchase, setIsJointPurchase] = useState<boolean>(false);

  const [postProduct, { isLoading: isProductLoading }] =
    sellerEndpoints.useSellerProductMutation();

  const [postPreorder, { isLoading: isPreorderLoading }] =
    sellerEndpoints.useSellerPreorderMutation();

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current < moment().add(6, 'd');

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
      const {
        categoryId,
        currency,
        description,
        imageUrls,
        preorderEndsAt,
        preorderExpectedQuantity,
        price,
        priceWithoutDiscount,
        techDescription,
        title,
      } = values;

      const formData = {
        categoryId,
        currency,
        description,
        imageUrls: imageUrls ? [`${imageUrls}`] : [],
        preorderEndsAt: preorderEndsAt
          ? new Date(preorderEndsAt).toISOString()
          : null,
        preorderExpectedQuantity,
        price,
        priceWithoutDiscount,
        techDescription,
        title,
      };

      const product = isJointPurchase
        ? await postPreorder(formData).unwrap()
        : await postProduct(formData).unwrap();

      setIsModalOpen(false);
      message.success(`${product.title} ${t('Order created')}`);
    } catch (err) {
      Modal.error({
        title: t('Error'),
        content: `Error: ${
          (err as IErr)?.data?.message || 'Unresolved message'
        }`,
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
        <SwitchMelon
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
          onClick={() => setIsJointPurchase(!isJointPurchase)}
        />
        &nbsp;
        <span>{t('With joint purchase function')}</span>
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
            label={t('Currency')}
            name="currency"
          >
            <SelectMelon>
              <Option value="USD">USD</Option>
              <Option value="RUB">RUB</Option>
              <Option value="CNY">CNY</Option>
              <Option value="EUR">EUR</Option>
            </SelectMelon>
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label={t('Price')}
            name="price"
          >
            <InputMelon min={1} type="number" />
          </Form.Item>
          {isJointPurchase ? (
            <>
              <Form.Item
                rules={[{ required: true }]}
                label={t('Price without discount')}
                name="priceWithoutDiscount"
              >
                <InputMelon />
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label={t('Size of joint purchase')}
                name="preorderExpectedQuantity"
              >
                <InputMelon />
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label={t('End date of joint purchase')}
                name="preorderEndsAt"
              >
                <DatePickerMelon
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </>
          ) : null}
          <Form.Item label={t('Product image link')} name="imageUrls">
            <InputMelon />
          </Form.Item>
          <Form.Item>
            <ButtonMelon
              htmlType="submit"
              type="primary"
              loading={isProductLoading || isPreorderLoading}
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
