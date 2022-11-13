import { BarcodeOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Col,
  Descriptions,
  Divider,
  List,
  Progress,
  Row,
  Statistic,
  Steps,
  Typography,
} from 'antd';
import PaymentForm from 'features/client/paymentForm/PaymentForm';
import React from 'react';
import { dom } from 'shared/lib';
import './PreorderPage.scss';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';

const { Step } = Steps;

const PreorderPage = () => {
  // TODO Убрать inline-стили
  dom.useTitle('Предзаказ');
  return (
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
              Preorder № 125
            </Typography.Title>
          </Divider>
        </Col>
        <Col span={12} className="preorder-page__steps">
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
        <Col span={12} className="preorder-page__progress">
          <Row>
            <Col span={12}>
              <Progress
                percent={67}
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </Col>
            <Col span={12}>
              <Statistic title="Активных участников" value={67} />
              <Statistic title="Всего участников" value={100} />
            </Col>
          </Row>

          <Statistic.Countdown
            title="До конца сборов осталось:"
            value={Date.now() + 1000 * 45 * 60 * 24 * 2 + 1000 * 40}
            format="D дней HH часов mm минут"
          />
          <Descriptions
            bordered
            column={1}
            title="Preorder info"
            extra={
              <>
                Seller Абдурозик <Avatar icon={<UserOutlined />} />
              </>
            }
          >
            <Descriptions.Item label="Item">Iphone 18</Descriptions.Item>
            <Descriptions.Item label="Price each">80 $</Descriptions.Item>
            <Descriptions.Item label="Country">Turkey</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <div className="preorder-page__actions">
        <Row gutter={24}>
          <Col span={12}>
            <PaymentForm sum={1000} />
          </Col>
          <Col span={12}>
            <List>
              <List.Item>
                <List.Item.Meta
                  title="Product 1"
                  avatar={<Avatar shape="square" icon={<BarcodeOutlined />} />}
                  description="Product 1 awesome description"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Product 2"
                  avatar={<Avatar shape="square" icon={<BarcodeOutlined />} />}
                  description="Product 2 awesome description"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Product 3"
                  avatar={<Avatar shape="square" icon={<BarcodeOutlined />} />}
                  description="Product 3 awesome description"
                />
              </List.Item>
            </List>
            <Divider />
            <Typography.Title level={3}>Summary: 1000 $</Typography.Title>
            <Typography.Paragraph type="secondary">
              Оформляя предзаказ вы покупаете товар со скидкой, цена без скидки
              составила бы для вас 1250 $
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default PreorderPage;
