import { SafetyCertificateTwoTone, WarningOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

interface IData {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  currency?: 'USD' | 'RUB';
  rating?: number;
  quantityOfBuying?: number;
  checked?: boolean;
}

interface IProductCard {
  actions?: React.ReactNode;
  data: IData;
  titleHref?: string;
}

const ProductCard: React.FC<IProductCard> = ({ data, titleHref, actions }) => {
  const params = useParams();
  const title = titleHref ? (
    <Link to={`/categories/${params.categoryId}/products/${titleHref}`}>
      {data.title}
    </Link>
  ) : (
    data.title
  );

  return (
    <div className="product-card">
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
              <SafetyCertificateTwoTone twoToneColor="#3888FF" />
            ) : (
              <WarningOutlined className="product-card__check-warning" />
            )}
          </div>
        </div>
      </div>
      <div className="product-card__buisness">
        <p className="product-card__price">{data.price} $</p>
        <div className="product-card__actions">{actions}</div>
      </div>
    </div>
  );
};

export default ProductCard;
