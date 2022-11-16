import { UserOutlined } from '@ant-design/icons';
import { Avatar, Descriptions, Rate, Tooltip } from 'antd';
import React from 'react';
import { EditSeller } from 'features/seller/edit-seller';
import { Seller } from 'shared/api/types/interfaces';
import './SellerProfile.scss';
import { useTranslation } from 'react-i18next';
import { isResolutionLessThan } from '../../../../shared/lib/utils';

interface IProps {
  data: Seller | null | undefined;
}

const SellerProfile: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Descriptions
      className="seller-dashboard__description"
      title={`${t("Seller's profile")} ${data?.name || ''}`}
      bordered
      column={{ xs: 1, sm: 1, md: 1, lg: 2, xxl: 2 }}
      size={isResolutionLessThan('xl') ? 'small' : 'default'}
      extra={
        <div className="seller-dashboard__extra">
          <Tooltip title={t('Balance (retained)')}>
            <p className="seller-dashboard__extra-money">
              {data?.balance || 0}$
              <span className="seller-dashboard__charge">
                ({data?.holdBalance || 0}$)
              </span>
            </p>
          </Tooltip>
          <EditSeller.EditSellerButton />
          <Avatar
            size={isResolutionLessThan('md') ? 'small' : 'large'}
            icon={<UserOutlined />}
          />
        </div>
      }
    >
      <Descriptions.Item label="ID">{data?.id || '001'}</Descriptions.Item>
      <Descriptions.Item label={t('Name')}>
        {data?.name || t('Name is not set')}
      </Descriptions.Item>
      <Descriptions.Item label={t('Country')}>
        {data?.country || t('Country is not selected')}
      </Descriptions.Item>
      <Descriptions.Item label="E-mail">{data?.email}</Descriptions.Item>
      <Descriptions.Item label={t('Rating')}>
        {isResolutionLessThan('md') ? null : (
          <>
            <Rate
              value={data?.rating !== null ? data?.rating : 4.7}
              allowHalf
              disabled
            />
            &nbsp;
          </>
        )}
        {data?.rating !== null ? data?.rating : 4.7}
      </Descriptions.Item>
      <Descriptions.Item label={`${t('Successful purchases')}:`}>
        {data?.completedOrders || 0}
      </Descriptions.Item>
      <Descriptions.Item label={t('Purchase fee')}>
        {data?.charge || 0}%
      </Descriptions.Item>
      <Descriptions.Item label={t('Currency')}>
        {data?.currency || 'USD'}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default SellerProfile;
