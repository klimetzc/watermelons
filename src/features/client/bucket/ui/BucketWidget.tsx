import React from 'react';
import { LoadingOutlined, ShoppingOutlined } from '@ant-design/icons';
import './BucketWidget.scss';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { clientEndpoints } from '../../../../shared/api/client.endpoints';

interface IBucketWidget {
  onClick?: () => void;
}

const BucketWidget: React.FC<IBucketWidget> = ({ onClick }) => {
  const { data: bucket, isLoading: isBucketLoading } =
    clientEndpoints.useBucketQuery('');

  return (
    // TODO jsx-a11y
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="bucket-widget" onClick={onClick}>
      <Link to="/bucket" className="bucket-widget__link">
        <Badge count={bucket?.length} offset={[-50, 16]}>
          {isBucketLoading && (
            <LoadingOutlined style={{ fontSize: '28px', color: 'gray' }} />
          )}
          <ShoppingOutlined
            style={{ fontSize: '28px' }}
            className="bucket-widget__bucket-img"
          />
        </Badge>
      </Link>
    </div>
  );
};

export default BucketWidget;
