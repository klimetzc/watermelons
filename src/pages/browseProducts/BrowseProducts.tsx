/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Breadcrumb, Empty, Pagination, Tag } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCard from 'entities/product/ui/ProductCard';
import BuyBucketButton from 'features/client/buy-bucket-btn/ui/BuyBucketButton';
import FilterProducts from 'features/common/filter/ui/FilterProducts';
import './BrowseProducts.scss';
import useFilter from 'features/common/filter/model/useFilter';
import SortProducts from 'features/common/filter/ui/SortProducts';
import { IFilter } from 'features/common/filter/types/interfaces';
import { dom } from 'shared/lib';
import { categoriesEndpoints } from 'shared/api/categories.endpoints';
import { useTranslation } from 'react-i18next';

const initialFilter: IFilter = {
  search: '',
  filters: { checked: false, preorder: false },
  range: [0, 1000],
};

const BrowseProducts = () => {
  dom.useTitle('Просмотр товаров');
  const params = useParams();
  const { data: category } = categoriesEndpoints.useCategoryQuery(
    params.categoryId!
  );
  const { data: products = null, isLoading: productsIsLoading } =
    categoriesEndpoints.useProductsQuery(params.categoryId!);
  const [filter, setFilter] = useState<IFilter>(initialFilter);
  const [sort, setSort] = useState('');

  const [pageNumber, setPageNumber] = useState<number>(1);

  const sortedAndFilteredProducts = useFilter(
    products,
    sort,
    filter.search,
    filter.filters,
    filter.range
  );

  const { t } = useTranslation();

  const tagsData = ['Только лучшее', 'Арбуз в подарок', 'Сюрприз', 'Из Турции'];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((tg) => tg !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <div className="browse-products-page">
      <div className="browse-products-page__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{category?.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <main className="browse-products-page__main">
        <aside className="browse-products-page__settings">
          <FilterProducts state={{ filter, setFilter }} reset={initialFilter} />
        </aside>
        <div className="browse-products-page__products">
          <aside className="browse-products-page__additional-settings">
            {t('Category')}:{' '}
            {tagsData.map((tag) => (
              <Tag.CheckableTag
                className="browse-products-page__tag"
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </aside>
          <div>
            <SortProducts sort={sort} setSort={setSort} />
          </div>
          <Pagination
            showSizeChanger={false}
            current={pageNumber}
            total={sortedAndFilteredProducts?.length || 0}
            onChange={(page) => {
              setPageNumber(page);
            }}
          />
          <section className="browse-products-page__products-list">
            {productsIsLoading && (
              <LoadingOutlined style={{ fontSize: '50px', color: 'gray' }} />
            )}
            {sortedAndFilteredProducts ? (
              sortedAndFilteredProducts
                .slice(pageNumber * 10 - 10, pageNumber * 10)
                .map((item) => (
                  <ProductCard
                    data={item}
                    key={item.id}
                    titleHref={item.id}
                    actions={
                      <BuyBucketButton cardId={`${item.id}`} cardData={item} />
                    }
                    isCollabsVisble={!!item.preorder}
                  />
                ))
            ) : (
              <p>{t('No products found')}</p>
            )}
            {sortedAndFilteredProducts?.length ? null : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </section>
          <Pagination
            showSizeChanger={false}
            current={pageNumber}
            total={sortedAndFilteredProducts?.length || 0}
            onChange={(page) => {
              setPageNumber(page);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default BrowseProducts;
