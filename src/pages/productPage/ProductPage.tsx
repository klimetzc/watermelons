import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReviewCard from '../../features/review/ui/ReviewCard';
import Header from '../../widgets/Header/Header';
import './ProductPage.scss';

const ProductPage: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    document.title = `Товар № ${params.productId}`;
  }, []);

  return (
    <>
      <Header />
      <div className="product-page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {' '}
            <Link to="/categories">Категории</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {' '}
            <Link to={`/categories/${params.categoryId}/products`}>
              Категория - {params.categoryId}
            </Link>{' '}
          </Breadcrumb.Item>
          <Breadcrumb.Item>Товары</Breadcrumb.Item>
        </Breadcrumb>
        <div className="product-page__product-card">
          <div className="product-page__image-main" />
          <div className="product-page__product-card__info">
            <h2 className="product-page__product-title">Имя продукта</h2>
            <div className="product-page__product-features">
              <div className="product-page__rating">5</div>
              <div className="product-page__feature-actions">123</div>
            </div>
            <div className="product-page__product-tech-description">
              Тех описание
            </div>
            <div className="product-page__buisness-actions">
              <div className="product-page__price">1000</div>
              <button type="button">Купить!</button>
            </div>
          </div>
        </div>
        <div className="product-page__full-description">desc</div>
        <div className="product-page__full-tech-description">full tech</div>
        <div className="product-page-reviews">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
