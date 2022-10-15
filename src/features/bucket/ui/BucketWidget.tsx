import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import './BucketWidget.scss';

interface IBucketProps {
  onClick?: () => void;
}

const BucketWidget: React.FC<IBucketProps> = ({ onClick }) => (
  // TODO jsx-a11y
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className="bucket-widget" onClick={onClick}>
    <p className="bucket-widget__quantity">16 шт.</p> <ShoppingOutlined />
  </div>
);

export default BucketWidget;
