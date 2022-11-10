import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

interface ICard {
  id: number;
}

export const Card: React.FC<ICard> = ({ id }) => (
  <Link to={`/preorder/${id}`}>
    <Row className="preorder-card">
      <Col span={4}>Preorder</Col>
      <Col span={20}>{id}</Col>
    </Row>
  </Link>
);
