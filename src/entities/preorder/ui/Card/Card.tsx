import { Col, Row, Tag, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { IPreorder } from 'shared/api/types/interfaces';
import './Card.scss';

interface ICard {
  id: number;
  rootLink: 'dashboard' | 'profile';
  data?: IPreorder;
}

export const Card: React.FC<ICard> = ({ id, rootLink, data = null }) => (
  <Link to={`/${rootLink}/preorders/${id}`}>
    <Row className="preorder-card" gutter={20}>
      <Col lg={2} xs={24}>
        <Typography.Text strong>{id}</Typography.Text>
      </Col>
      <Col lg={12} xs={24}>
        <Typography.Text ellipsis>{data?.title || 'Preorder'}</Typography.Text>
      </Col>
      <Col lg={10} xs={24}>
        <Tag color="processing">{data?.preorderStatus || 'Без статуса'}</Tag>{' '}
      </Col>
    </Row>
  </Link>
);
