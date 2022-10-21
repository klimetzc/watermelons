/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BuyBucketButton from '../../features/buy-bucket-btn/ui/BuyBucketButton';
// import ReviewCard from '../../features/review/ui/ReviewCard';
import categoriesApi from '../../shared/api/categories';
import { ICategory, IProductFull } from '../../shared/api/types/interfaces';
import './ProductPage.scss';

const ProductPage: React.FC = () => {
  const params = useParams();
  const [categoryName, setCategoryName] = useState<string>('Категория');
  const [productData, setProductData] = useState<IProductFull | null>(null);

  useEffect(() => {
    document.title = `Товар № ${params.productId}`;

    categoriesApi
      .getCategory(params.categoryId!)
      .then((categoryData: ICategory) => {
        setCategoryName(categoryData.title);
      })
      .catch((err) => {
        console.log(err);
      });

    categoriesApi
      .getProduct(params.categoryId!, params.productId!)
      .then((product: IProductFull) => {
        setProductData(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="product-page">
      <nav className="product-page__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {' '}
            <Link to="/categories">Категории</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {' '}
            <Link to={`/categories/${params.categoryId}/products`}>
              {categoryName}
            </Link>{' '}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productData?.title || 'Товар'}</Breadcrumb.Item>
        </Breadcrumb>
      </nav>

      <div className="product-page__product-card">
        <div className="product-page__image-main" />
        <div className="product-page__product-card__info">
          <h2 className="product-page__product-title">
            {productData?.title || 'Имя продукта'}
          </h2>
          <div className="product-page__product-features">
            <div className="product-page__rating">
              <Rate allowHalf value={productData?.rating || 4.0} disabled />
              <span className="product-page__ratingQuantity">
                {productData?.quantityOfBuying || '100'}
              </span>
            </div>
            <div className="product-page__feature-actions">
              <div className="product-page__feature product-page__feature-comparison" />
              <div className="product-page__feature product-page__feature-bookmark" />
              <div className="product-page__feature product-page__feature-share" />
            </div>
          </div>
          <div className="product-page__product-tech-description">
            <p className="product-page__product-tech-description-title">
              Технические характеристики
            </p>
            <p className="product-page__product-tech-description-paragraph">
              {productData?.techDescription || 'Описания нет'}
            </p>
          </div>
          <div className="product-page__buisness-actions">
            <div className="product-page__price">
              {productData?.price || '1000'} $
            </div>
            <div className="product-page__buy-buttons">
              <BuyBucketButton
                cardId={`${params.productId}`}
                cardData={{
                  id: productData?.id || 1,
                  title: productData?.title || 'title',
                  description: productData?.description || 'desc',
                  price: productData?.price || 12,
                  currency: productData?.currency || 'USD',
                  checked: productData?.checked || true,
                  rating: productData?.rating || 4,
                  quantityOfBuying: productData?.quantityOfBuying || 19,
                  image: null,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="product-page__full-description">
        <h3 className="product-page__full-description-title">Описание</h3>
        <p className="product-page__full-description-paragraph">
          {productData?.description || 'Описания нет'}
        </p>
      </div>
      <div className="product-page__full-tech-description">
        <h3 className="product-page__full-description-title">
          Техническое описание
        </h3>
        <p className="product-page__full-description-paragraph">
          {productData?.techDescription || 'Технического описания нет'}
        </p>
      </div>
      {/* <div className="product-page-reviews">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div> */}
    </div>
  );
};

export default ProductPage;
