import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const ProductPage: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    document.title = `Товар № ${params.productId}`;
  }, []);

  return <div className="product-page">Data: {params.productId}</div>;
};

export default ProductPage;
