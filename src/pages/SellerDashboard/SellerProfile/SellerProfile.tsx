import { UserOutlined } from '@ant-design/icons';
import { Avatar, Descriptions, Rate, Tooltip } from 'antd';
import React from 'react';
import EditSellerButton from '../../../features/seller/edit-seller/EditSellerButton';
import { Seller } from '../../../shared/api/types/interfaces';
import './SellerProfile.scss';

interface IProps {
  data: Seller | null;
}

const SellerProfile: React.FC<IProps> = ({ data }) => (
  <Descriptions
    className="seller-dashboard__description"
    title={`Профиль продавца ${data?.name || ''}`}
    bordered
    column={2}
    extra={
      <div className="seller-dashboard__extra">
        <Tooltip title="Баланс (удержано)">
          <p className="seller-dashboard__extra-money">
            {data?.balance || 0}$
            <span className="seller-dashboard__charge">
              ({data?.holdBalance || 0}$)
            </span>
          </p>
        </Tooltip>
        <EditSellerButton />
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    }
  >
    <Descriptions.Item label="ID">{data?.id || '001'}</Descriptions.Item>
    <Descriptions.Item label="Имя">
      {data?.name || 'Имя не установлено'}
    </Descriptions.Item>
    <Descriptions.Item label="Страна">
      {data?.country || 'Страна не установлена'}
    </Descriptions.Item>
    <Descriptions.Item label="E-mail">{data?.email}</Descriptions.Item>
    <Descriptions.Item label="Рейтинг">
      <Rate
        value={data?.rating !== null ? data?.rating : 4.7}
        allowHalf
        disabled
      />{' '}
      {data?.rating !== null ? data?.rating : 4.7}
    </Descriptions.Item>
    <Descriptions.Item label="Успешных заказов:">
      {data?.completedOrders || 0}
    </Descriptions.Item>
    <Descriptions.Item label="Комиссия на продажи">
      {data?.charge || 0}%
    </Descriptions.Item>
    <Descriptions.Item label="Валюта">
      {data?.currency || 'USD'}
    </Descriptions.Item>
  </Descriptions>
);
export default SellerProfile;
