import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
            <Link to="/categories">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {' '}
            <Link to="/welcome">CategoriesID{params.categoryId}</Link>{' '}
          </Breadcrumb.Item>
          <Breadcrumb.Item>product</Breadcrumb.Item>
        </Breadcrumb>
        product id: {params.productId}, category id: {params.categoryId}
      </div>
    </>
  );
};

export default ProductPage;
