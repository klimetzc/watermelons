import {
  ClockCircleOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Tag } from 'antd';
import React from 'react';
import { IPreorderSubscriber } from 'shared/api/types/interfaces';
import { getHumanReadableStatus } from '../lib/utils';
import '../PreorderPage.scss';

/*
Не является сущностью из-за сильной привязке у месту применения?
*/

interface IUserListItem {
  data: IPreorderSubscriber;
}

const UserListItem: React.FC<IUserListItem> = ({ data }) => (
  <div className="preorder-page__user-list-item">
    <Avatar shape="square" icon={<UserOutlined />} />
    <p className="preorder-page__user-item-name">{data?.name || 'Username'}</p>
    <p className="preorder-page__user-item-quantity">
      {`${`${data?.preorderedQuantity} шт.` || '0 шт.'}`}
    </p>
    <Tag icon={<ClockCircleOutlined />}>
      {getHumanReadableStatus(data?.participationStatus) || 'Ожидает оплаты'}
    </Tag>
    <DeleteOutlined className="preorder-page__user-item-delete" />
  </div>
);

export default UserListItem;
