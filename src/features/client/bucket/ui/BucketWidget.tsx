import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingOutlined } from '@ant-design/icons';
import './BucketWidget.scss';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import type { RootState } from '../../../../app/store';
import clientApi from '../../../../shared/api/client';
import { bucketActions } from '../model/bucket';
import { IProduct } from '../../../../shared/api/types/interfaces';

interface IBucketWidget {
  onClick?: () => void;
}

const BucketWidget: React.FC<IBucketWidget> = ({ onClick }) => {
  const dispatch = useDispatch();
  const bucket = useSelector((state: RootState) => state.bucketReducer.bucket);
  useEffect(() => {
    clientApi
      .getBucket()
      .then((res: IProduct[] | []) => {
        dispatch(bucketActions.clearBucket()); // Нужен только при разработке
        dispatch(bucketActions.pushToBucket(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // TODO jsx-a11y
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="bucket-widget" onClick={onClick}>
      <Link to="/bucket">
        <Badge count={bucket.length} offset={[-50, 16]}>
          <ShoppingOutlined style={{ fontSize: '28px' }} />
        </Badge>
      </Link>
    </div>
  );
};

export default BucketWidget;
