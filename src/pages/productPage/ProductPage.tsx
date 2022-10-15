import React from 'react';
import { useParams } from 'react-router';

const ProductPage: React.FC = () => {
  const params = useParams();

  return <div className="product-page">Data: {params.productId}</div>;
};

export default ProductPage;
