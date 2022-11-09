import React from 'react';
import {
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Progress, Rate, Tooltip, Typography } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IProduct, IProductWithCount } from 'shared/api/types/interfaces';
import './ProductCard.scss';
import { useTranslation } from 'react-i18next';
import { getCurrencyString } from '../lib/getCurrencyString';

interface IProductCard {
  actions?: React.ReactNode;
  data: IProduct | IProductWithCount;
  titleHref?: string | number;
  isCollabsVisble?: boolean;
}

const ProductCard: React.FC<IProductCard> = ({
  data,
  titleHref,
  actions,
  isCollabsVisble = false,
}) => {
  const { t } = useTranslation();
  const params = useParams();
  const title = titleHref ? (
    <Link to={`/categories/${params.categoryId}/products/${titleHref}`}>
      {data.title}
    </Link>
  ) : (
    data.title
  );

  return (
    <article className="product-card">
      <div className="product-card__image" />
      <div className="product-card__info">
        <p className="product-card__title">{title}</p>
        <p className="product-card__description">{data.description}</p>
        <div className="product-card__popularity">
          <div className="product-card__rating">
            <Rate defaultValue={data.rating} allowHalf disabled />
            <p className="product-card__quantity">{data.quantityOfBuying}</p>
          </div>
          <div className="product-card__checked">
            {data.checked ? (
              <SafetyCertificateOutlined style={{ color: '#3888ff' }} />
            ) : (
              <WarningOutlined className="product-card__check-warning" />
            )}
          </div>
        </div>
      </div>
      <div className="product-card__buisness">
        <p className="product-card__price">
          {data.price} {getCurrencyString(data.currency)}
        </p>
        <div className="product-card__actions">{actions}</div>
      </div>
      {isCollabsVisble && (
        <div className="product-card__collab-widget">
          <div className="product-card__progress-bar">
            <Typography.Text>400</Typography.Text>
            <Progress percent={50} status="active" showInfo={false} />
            <Typography.Text>800</Typography.Text>
          </div>
          <div className="product-card__collab-info">
            <Tooltip title={t('Collabs')}>
              <Link
                to={`/categories/${params.categoryId}/products/${titleHref}`}
              >
                <UsergroupAddOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Tooltip>
            <Typography.Text>до 12.20.2022</Typography.Text>
          </div>
          <div className="product-card__collab-price">
            <p className="product-card__collab-price-paragraph">
              500 {getCurrencyString(data.currency)}
            </p>
            <p className="product-card__collab-price-old">
              {data.price} {getCurrencyString(data.currency)}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
