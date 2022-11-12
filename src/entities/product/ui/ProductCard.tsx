import React, { useState } from 'react';
import {
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Progress, Rate, Tooltip, Typography, Image } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IProduct, IProductWithCount } from 'shared/api/types/interfaces';
import './ProductCard.scss';
import fallBackImage from 'shared/assets/images/iphone.png';
import { useTranslation } from 'react-i18next';
import { utils } from 'shared/lib';
import { getCurrencyString } from 'shared/lib/utils';
import moment from 'moment';

interface IProductCard {
  actions?: React.ReactNode;
  data: IProduct | IProductWithCount;
  titleHref?: string | number;
  isCollabsVisble?: boolean;
  isolated?: boolean;
  categoryId?: string | number;
}

export const Card: React.FC<IProductCard> = ({
  data,
  titleHref,
  actions,
  isolated = false,
  isCollabsVisble = false,
  categoryId = undefined,
}) => {
  const params = useParams();
  const { t } = useTranslation();

  const title = titleHref ? (
    <Link
      to={`/categories/${
        isolated ? categoryId : params.categoryId
      }/products/${titleHref}`}
    >
      {data.title}
    </Link>
  ) : (
    data.title
  );

  const [visible, setVisible] = useState(false);

  return (
    <article className="product-card">
      <Image
        preview={{ visible: false }}
        fallback={fallBackImage}
        className="product-card__image"
        src={data.imageUrls![0] || 'error'}
        onClick={() => setVisible(true)}
      />
      {!!data.imageUrls?.length && (
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup
            preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
          >
            {data.imageUrls &&
              data.imageUrls.map((image) => (
                <Image key={data.id} src={image} />
              ))}
          </Image.PreviewGroup>
        </div>
      )}
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
          {data.preorder ? data.preorder.priceWithoutDiscount : data.price}{' '}
          {getCurrencyString(data.currency)}
        </p>
        <div className="product-card__actions">{actions}</div>
      </div>
      {isCollabsVisble && (
        <div className="product-card__collab-widget">
          <div className="product-card__progress-bar">
            <Typography.Text>
              {data.preorder?.preorderCurrentQuantity}
            </Typography.Text>
            <Progress
              percent={utils.getPercentFromValue(
                +data.preorder!.preorderCurrentQuantity,
                +data.preorder!.preorderExpectedQuantity
              )}
              status="active"
              showInfo={false}
            />
            <Typography.Text>
              {data.preorder?.preorderExpectedQuantity}
            </Typography.Text>
          </div>
          <div className="product-card__collab-info">
            <Tooltip title={t('Collabs')}>
              <Link
                to={`/categories/${params.categoryId}/products/${titleHref}`}
              >
                <UsergroupAddOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Tooltip>
            <Typography.Text>
              до {moment(data.preorder!.preorderEndsAt).format('DD.MM.YYYY')}
            </Typography.Text>
          </div>
          <div className="product-card__collab-price">
            <p className="product-card__collab-price-paragraph">
              {data.price} {getCurrencyString(data.currency)}
            </p>
            <p className="product-card__collab-price-old">
              {data.preorder?.priceWithoutDiscount}{' '}
              {getCurrencyString(data.currency)}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};
