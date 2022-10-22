/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCard from '../../entities/product/ui/ProductCard';
import BuyBucketButton from '../../features/client/buy-bucket-btn/ui/BuyBucketButton';
import categoriesApi from '../../shared/api/categories';
import { ICategory, IProduct } from '../../shared/api/types/interfaces';
import FilterProducts from '../../features/filter/ui/FilterProducts';
import './BrowseProducts.scss';
import useFilter from '../../features/filter/model/useFilter';
import SortProducts from '../../features/filter/ui/SortProducts';
import { IFilter } from '../../features/filter/types/interfaces';

const initialFilter: IFilter = {
  search: '',
  filters: { checked: false },
  range: [10, 1000],
};

const BrowseProducts = () => {
  const params = useParams();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [categoryName, setCategoryName] = useState<string>('Категория');
  const [filter, setFilter] = useState<IFilter>(initialFilter);
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sortedAndFilteredProducts = useFilter(
    products,
    sort,
    filter.search,
    filter.filters,
    filter.range
  );

  useEffect(() => {
    document.title = 'Просмотр товаров';
    setIsLoading(true);
    categoriesApi
      .getProducts(params.categoryId!)
      .then((productsList) => {
        setProducts(productsList);
        console.log(productsList);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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
          <FilterProducts state={{ filter, setFilter }} reset={initialFilter} />
        </div>
        <div className="browse-products-page__products">
          <div className="browse-products-page__additional-settings">
            Тут доп. настройки и теги
          </div>
          <div>
            <SortProducts sort={sort} setSort={setSort} />
          </div>
          <div className="browse-products-page__products-list">
            {isLoading && (
              <LoadingOutlined style={{ fontSize: '50px', color: 'gray' }} />
            )}
            {sortedAndFilteredProducts?.length ? (
              sortedAndFilteredProducts.map((item) => (
                <ProductCard
                  data={item}
                  key={item.id}
                  titleHref={item.id}
                  actions={
                    <BuyBucketButton cardId={`${item.id}`} cardData={item} />
                  }
                />
              ))
            ) : (
              <p>Такие товары не найдены</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseProducts;
