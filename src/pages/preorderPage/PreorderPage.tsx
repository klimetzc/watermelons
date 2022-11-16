import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Col,
  Descriptions,
  Divider,
  Progress,
  Row,
  Statistic,
  Steps,
  Typography,
} from 'antd';
import PaymentForm from 'features/client/paymentForm/PaymentForm';
import React from 'react';
import { dom, utils } from 'shared/lib';
import './PreorderPage.scss';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';
import { useParams } from 'react-router';
import { preordersEndpoints } from 'shared/api/preorders.endpoints';
import moment from 'moment';
import { Product } from 'entities/product';
import { IProduct } from 'shared/api/types/interfaces';
import { useTranslation } from 'react-i18next';
import UserList from './layout/UserList';

const { Step } = Steps;

interface IPreorderPage {
  isForSeller?: boolean;
}

const PreorderPage: React.FC<IPreorderPage> = ({ isForSeller = false }) => {
  // TODO Убрать inline-стили
  const { t } = useTranslation();
  const params = useParams();
  dom.useTitle('Предзаказ');
  const { data: preorderData, isLoading: isPreorderLoading } =
    preordersEndpoints.usePreorderQuery(params.preorderId!);
  return !isPreorderLoading ? (
    <motion.div
      className="preorder-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimationVariants}
    >
      <Row className="preorder-page__info">
        <Col span={24}>
          <Divider style={{ paddingBottom: '15px' }}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              Preorder № {params.preorderId}
            </Typography.Title>
          </Divider>
        </Col>
        <Col lg={12} md={24} className="preorder-page__steps">
          <Steps current={0} direction="vertical">
            <Step
              title="Preorder created"
              description="Preorder creation date"
            />
            <Step
              title="Preorder payed"
              description="Preorder payed description"
            />
            <Step
              title="Preorder shipped"
              description="Preorder shipped description"
            />
            <Step
              title="Preorder delivered"
              description="Preorder delivered description"
            />
            <Step
              title="Preorder finished"
              description="Preorder finished description"
            />
          </Steps>
        </Col>
        <Col lg={12} md={24} className="preorder-page__progress">
          <Row>
            <Col span={12}>
              <Progress
                percent={
                  preorderData
                    ? utils.getPercentFromValue(
                        +preorderData!.preorderCurrentQuantity,
                        +preorderData!.preorderExpectedQuantity
                      )
                    : 0
                }
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Активных участников"
                value={preorderData?.preorderCurrentQuantity || 0}
              />
              <Statistic
                title="Всего участников"
                value={preorderData?.preorderExpectedQuantity || 1}
              />
            </Col>
          </Row>

          <Statistic.Countdown
            title="До конца сборов осталось:"
            value={moment(preorderData?.preorderEndsAt).format()}
            format="D дней HH часов mm минут"
          />
          <Descriptions
            bordered
            column={1}
            title="Preorder info"
            extra={
              <>
                {t('Seller')} {preorderData?.sellerName || 'Абудурозик'}{' '}
                <Avatar icon={<UserOutlined />} />
              </>
            }
          >
            <Descriptions.Item label="Item">
              {preorderData?.title || 'Iphone'}
            </Descriptions.Item>
            <Descriptions.Item label="Price each">
              {preorderData?.price || '0'} $
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {preorderData?.sellerCountry || 'Турция'}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      {isForSeller && <UserList />}
      <div className="preorder-page__actions">
        <Row gutter={24}>
          <Col lg={12} md={24}>
            <PaymentForm sum={preorderData?.price || 1000} />
          </Col>
          <Col lg={12} md={24}>
            {preorderData ? (
              <Product.Card
                data={preorderData as unknown as IProduct}
                isolated
              />
            ) : null}

            <Divider />
            <Typography.Title level={3}>
              Summary: {preorderData?.price} $
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              Оформляя предзаказ вы покупаете товар со скидкой, цена без скидки
              составила бы для вас {preorderData?.priceWithoutDiscount} $
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </motion.div>
  ) : (
    <LoadingOutlined style={{ fontSize: '30px' }} />
  );
};

export default PreorderPage;
