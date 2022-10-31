import React from 'react';
import { Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';

import { bucketActions } from '../../bucket/model/bucket';
import { clientEndpoints } from '../../../../shared/api/client.endpoints';

const ClearBucketBtn = () => {
  const dispatch = useDispatch();
  const [clearBucket, { isLoading: isClearBucketLoading }] =
    clientEndpoints.useClearBucketMutation();

  const onConfirm = async () => {
    try {
      await clearBucket('').unwrap();
      dispatch(bucketActions.clearBucket());
      message.success('Корзина очищена');
    } catch (error) {
      message.error('При очистке корзины произошла ошибка...');
    }
  };

  return (
    <Popconfirm
      title="Очистить корзину?"
      onConfirm={onConfirm}
      okButtonProps={{ loading: isClearBucketLoading }}
    >
      <ButtonMelon size="large" icon={<DeleteOutlined />}>
        Очистить корзину
      </ButtonMelon>
    </Popconfirm>
  );
};

export default ClearBucketBtn;
