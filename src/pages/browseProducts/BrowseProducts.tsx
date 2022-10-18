import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCard from '../../entities/product/ui/ProductCard';
import BuyBucketButton from '../../features/buy-bucket-btn/ui/BuyBucketButton';
import SearchMelon from '../../shared/ui/SearchMelon/SearchMelon';
import Header from '../../widgets/Header/Header';
import './BrowseProducts.scss';

const BrowseProducts = () => {
  const params = useParams();
  useEffect(() => {
    document.title = 'Просмотр товаров';
  }, []);

  return (
    <>
      <Header />
      <div className="browse-products-page">
        <nav className="browse-products-page__nav">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/welcome">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/categories">Категории</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Категория № {params.categoryId}</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <main className="browse-products-page__main">
          <div className="browse-products-page__settings">
            <SearchMelon hasShadow={false} />
          </div>
          <div className="browse-products-page__products">
            <div className="browse-products-page__additional-settings">
              Тут доп. настройки и теги
            </div>
            <div className="browse-products-page__products-list">
              <ProductCard
                data={{
                  title: 'Xiaomi',
                  description: 'лучший смартфон',
                  price: 1100,
                  currency: 'USD',
                  rating: 3.5,
                  quantityOfBuying: 400,
                  checked: false,
                }}
                titleHref="1"
                actions={<BuyBucketButton cardId="1" />}
              />
              <ProductCard
                data={{
                  title: 'Iphone',
                  description: 'А я еще лучше',
                  price: 1500,
                  currency: 'RUB',
                  rating: 4.5,
                  quantityOfBuying: 700,
                  checked: true,
                }}
                titleHref="2"
                actions={<BuyBucketButton cardId="2" />}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BrowseProducts;
