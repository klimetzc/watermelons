import React from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import { clearBucket } from '../../bucket/model/bucket';

const ClearBucketBtn = () => {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(clearBucket());
  };

  return (
    <Popconfirm title="Очистить корзину?" onConfirm={onConfirm}>
      <ButtonMelon size="large" icon={<DeleteOutlined />}>
        Очистить корзину
      </ButtonMelon>
    </Popconfirm>
  );
};

export default ClearBucketBtn;
