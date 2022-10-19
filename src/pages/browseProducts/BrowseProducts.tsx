/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCard from '../../entities/product/ui/ProductCard';
import BuyBucketButton from '../../features/buy-bucket-btn/ui/BuyBucketButton';
import categoriesApi from '../../shared/api/categories';
import { ICategory, IProduct } from '../../shared/api/types/interfaces';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import SearchMelon from '../../shared/ui/SearchMelon/SearchMelon';
import SwitchMelon from '../../shared/ui/SwitchMelon/SwitchMelon';
import Header from '../../widgets/Header/Header';
import './BrowseProducts.scss';

const BrowseProducts = () => {
  const params = useParams();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [categoryName, setCategoryName] = useState<string>('Категория');
  useEffect(() => {
    document.title = 'Просмотр товаров';
    categoriesApi
      .getProducts(params.categoryId!)
      .then((productsList) => {
        setProducts(productsList);
        console.log(productsList);
      })
      .catch((err) => {
        console.log(err);
      });

    categoriesApi
      .getCategory(params.categoryId!)
      .then((categoryData: ICategory) => {
        console.log(categoryData);
        setCategoryName(categoryData.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="browse-products-page">
        <nav className="browse-products-page__nav">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/welcome">
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/categories">Категории</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <main className="browse-products-page__main">
          <div className="browse-products-page__settings">
            <SearchMelon hasShadow={false} />
            <div className="browse-products-page__settings-toggle">
              <SwitchMelon /> Только проверенные
            </div>

            <ButtonMelon type="primary">Применить настройки</ButtonMelon>
            <ButtonMelon>Сбросить настройки</ButtonMelon>
          </div>
          <div className="browse-products-page__products">
            <div className="browse-products-page__additional-settings">
              Тут доп. настройки и теги
            </div>
            <div className="browse-products-page__products-list">
              {products ? (
                products.map((item) => (
                  <ProductCard
                    data={item}
                    key={item.id}
                    titleHref={item.id}
                    actions={<BuyBucketButton cardId={`${item.id}`} />}
                  />
                ))
              ) : (
                <ProductCard
                  data={{
                    title: 'Тест',
                    description: 'Тест тест',
                    price: 1100,
                    currency: 'USD',
                    rating: 3.5,
                    quantityOfBuying: 400,
                    checked: false,
                    id: 1,
                    image: null,
                  }}
                  titleHref="1"
                  actions={<BuyBucketButton cardId="1" />}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BrowseProducts;
