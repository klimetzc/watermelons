import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import { clearBucket } from '../../bucket/model/bucket';
import clientApi from '../../../../shared/api/client';

const ClearBucketBtn = () => {
  const dispatch = useDispatch();
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const onConfirm = () => {
    setIsButtonLoading(true);

    clientApi
      .clearBucket()
      .then(() => {
        dispatch(clearBucket());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  };

  return (
    <Popconfirm
      title="Очистить корзину?"
      onConfirm={onConfirm}
      okButtonProps={{ loading: isButtonLoading }}
    >
      <ButtonMelon size="large" icon={<DeleteOutlined />}>
        Очистить корзину
      </ButtonMelon>
    </Popconfirm>
  );
};

export default ClearBucketBtn;
