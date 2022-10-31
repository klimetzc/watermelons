import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import CategorySwitcher from '../../features/common/switch-category/ui/CategorySwitcher';
import CategoryLink from '../../features/common/category-link/CategoryLink';
import './BrowseCategories.scss';
import { dom } from '../../shared/lib';
import { categoriesEndpoints } from '../../shared/api/categories.endpoints';

const BrowseCategories = () => {
  dom.useTitle('Просмотр категорий');
  const {
    data: categories,
    error,
    isLoading,
  } = categoriesEndpoints.useCategoriesQuery('');

  return (
    <div className="browse-categories">
      <div className="browse-categories__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Категории</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <main className="browse-categories__main">
        <CategorySwitcher />

        {isLoading && (
          <div className="browse-categories__loader">
            <LoadingOutlined style={{ fontSize: '80px', color: 'gray' }} />
          </div>
        )}
        {error && 'Произошла ошибка'}
        <section className="browse-categories__cards">
          {categories &&
            categories.map((category) => (
              <CategoryLink key={category.id} data={category} />
            ))}
        </section>
      </main>
    </div>
  );
};

export default BrowseCategories;
