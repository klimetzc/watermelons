import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import ProductCard from '../../entities/product/ui/ProductCard';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import Header from '../../widgets/Header/Header';
import './BrowseProducts.scss';

const BrowseProducts = () => {
  useEffect(() => {
    document.title = 'Просмотр товаров';
  }, []);

  return (
    <>
      <Header />
      <div className="browse-products-page">
        <div className="browse-products-page__settings">
          Тут будут настройки
        </div>
        <div className="browse-products-page__products">
          <div className="browse-products-page__additional-settings">
            Тут будут доп. настройки
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
              actions={
                <>
                  <ButtonMelon sliced="right" size="large">
                    Купить
                  </ButtonMelon>
                  <ButtonMelon sliced="left" size="large">
                    <ShoppingCartOutlined />
                  </ButtonMelon>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseProducts;
