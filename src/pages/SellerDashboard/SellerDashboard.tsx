import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './SellerDashboard.scss';
import {
  IProduct,
  IProductKeys,
  ISellerOrder,
  ISellerOrderKeys,
} from 'shared/api/types/interfaces';
import { dom, hooks } from 'shared/lib';
import { sellerEndpoints } from 'shared/api/seller.endpoints';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';
import SellerProfile from './layout/SellerProfile/SellerProfile';
import SellerProducts from './layout/SellerProducts/SellerProducts';
import SellerOrders from './layout/SellerOrders/SellerOrders';
import { isResolutionLessThan } from '../../shared/lib/utils';
import SellerPreorders from './layout/SellerPreorders/SellerPreorders';

const SellerDashboard = () => {
  const { t } = useTranslation();
  dom.useTitle('Панель управления');
  const { data: sellerData } = sellerEndpoints.useSellerProfileQuery('');
  const { data: sellerProducts } = sellerEndpoints.useSellerProductsQuery('');
  const { data: sellerOrders } = sellerEndpoints.useSellerOrdersQuery('');

  const [sellerDiscontinuedProducts, sellerOnsaleProducts] = hooks.useDivideBy<
    IProduct,
    IProductKeys
  >(sellerProducts, 'discontinued', true);
  const [sellerCompletedOrders, sellerUncompletedOrders] = hooks.useDivideBy<
    ISellerOrder,
    ISellerOrderKeys
  >(sellerOrders, 'orderStatus', 'COMPLETED');

  return (
    <motion.div
      className="seller-dashboard"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimationVariants}
    >
      <div className="seller-dashboard__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{t('Control panel')}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Tabs
        defaultActiveKey="1"
        tabPosition={isResolutionLessThan('md') ? 'top' : 'left'}
        size={isResolutionLessThan('md') ? 'small' : 'large'}
        className="seller-dashboard__tabs"
        items={[
          {
            label: t('Profile'),
            key: '1',
            children: <SellerProfile data={sellerData} />,
          },
          {
            label: t('Products'),
            key: '2',
            children: (
              <SellerProducts
                viewProducts={sellerOnsaleProducts}
                emptyMessage={t('You have not yet uploaded any products')}
              />
            ),
          },
          {
            label: t('Deleted products'),
            key: '3',
            children: (
              <SellerProducts
                viewProducts={sellerDiscontinuedProducts}
                emptyMessage={t('You do not have any deleted products')}
                isDeleted
              />
            ),
          },
          {
            label: t('Active orders'),
            key: '4',
            children: (
              <SellerOrders
                orders={sellerUncompletedOrders}
                label={t('Active orders')}
                emptyMessage={t('No active orders')}
              />
            ),
          },
          {
            label: t('Completed orders'),
            key: '5',
            children: (
              <SellerOrders
                orders={sellerCompletedOrders}
                label={t('Completed orders')}
                emptyMessage={t('There are no completed orders yet')}
              />
            ),
          },
          {
            label: t('Joint purchases'),
            key: '6',
            children: (
              <SellerPreorders
                viewProducts={sellerOnsaleProducts}
                label={t('Joint purchases')}
                emptyMessage={t('There are no joint purchases yet')}
              />
            ),
          },
        ]}
      />
    </motion.div>
  );
};

export default SellerDashboard;
