import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Col, Result, Row, Typography } from 'antd';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import '../PreorderPage.scss';

const SellerController = () => (
  <Row
    gutter={12}
    justify="center"
    className="preorder-page__seller-controller"
  >
    <Col span={24}>
      <Typography.Paragraph>
        Вы можете укомплектовать заказ как только наберётся нужное количество
        участников, либо отменить заказ
      </Typography.Paragraph>
    </Col>
    <Col span={24}>
      <ButtonMelon type="primary">Укомплектовать заказ</ButtonMelon>
    </Col>
    <Result
      icon={<DeleteOutlined />}
      title="Вы можете отменить заказ пока не набралось нужное количество участников"
      extra={<ButtonMelon icon={<DeleteOutlined />}>Удалить</ButtonMelon>}
    />
  </Row>
);

export default SellerController;
