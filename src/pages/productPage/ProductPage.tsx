/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Rate, Skeleton } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import BuyBucketButton from '../../features/client/buy-bucket-btn/ui/BuyBucketButton';
import categoriesApi from '../../shared/api/categories';
import { ICategory, IProductFull } from '../../shared/api/types/interfaces';
import './ProductPage.scss';

const ProductPage: React.FC = () => {
  const params = useParams();
  const [categoryName, setCategoryName] = useState<string>('Категория');
  const [productData, setProductData] = useState<IProductFull | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = `Товар № ${params.productId}`;
    setIsLoading(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="product-page">
      <div className="product-page__nav">
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
      </div>

      <div className="product-page__product-card">
        {isLoading ? (
          <Skeleton.Image active />
        ) : (
          <div className="product-page__image-main" />
        )}

        <div className="product-page__product-card__info">
          <h2 className="product-page__product-title">
            {isLoading ? <Skeleton.Input active /> : productData?.title}
          </h2>
          <div className="product-page__product-features">
            <div className="product-page__rating">
              {isLoading ? (
                <Skeleton.Input active />
              ) : (
                <Rate allowHalf value={productData?.rating || 0.0} disabled />
              )}
              <span className="product-page__ratingQuantity">
                {isLoading ? (
                  <Skeleton.Input size="small" active />
                ) : (
                  productData?.quantityOfBuying
                )}
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
              {isLoading ? <Skeleton active /> : productData?.techDescription}
            </p>
          </div>
          <div className="product-page__buisness-actions">
            <div className="product-page__price">
              {isLoading ? (
                <Skeleton.Input active />
              ) : (
                `${productData?.price} $`
              )}
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
                  idCategory: productData?.idCategory || 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="product-page__full-description">
        <h3 className="product-page__full-description-title">Описание</h3>
        <p className="product-page__full-description-paragraph">
          {isLoading ? <Skeleton active /> : productData?.description}
        </p>
      </div>
      <div className="product-page__full-tech-description">
        <h3 className="product-page__full-description-title">
          Техническое описание
        </h3>
        <p className="product-page__full-description-paragraph">
          {isLoading ? <Skeleton active /> : productData?.techDescription}
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
