import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import './BucketWidget.scss';
import { Badge } from 'antd';

interface IBucketProps {
  onClick?: () => void;
}

const BucketWidget: React.FC<IBucketProps> = ({ onClick }) => (
  // TODO jsx-a11y
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className="bucket-widget" onClick={onClick}>
    <Badge count={42} offset={[-50, 16]}>
      <ShoppingOutlined style={{ fontSize: '28px' }} />
    </Badge>
    {/* <p className="bucket-widget__quantity">16 шт.</p> */}
  </div>
);

export default BucketWidget;
