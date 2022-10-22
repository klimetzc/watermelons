import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import CategorySwitcher from '../../features/switch-category/ui/CategorySwitcher';
import CategoryLink from '../../features/category-link/CategoryLink';
import categoriesApi from '../../shared/api/categories';
import './BrowseCategories.scss';

interface ICategory {
  id: number;
  title: string;
}

const BrowseCategories = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    categoriesApi
      .getCategories()
      .then((json) => {
        console.log('categories:', json);
        setCategories(json);
      })
      .catch((err) => {
        console.error('КАТЕГОРИИ ОШИБКА');
        console.log('err categories: ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    document.title = 'Просмотр категорий';
  }, []);

  return (
    <div className="browse-categories">
      <nav className="browse-categories__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Категории</Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <main className="browse-categories__main">
        <CategorySwitcher />

        {isLoading && (
          <div className="browse-categories__loader">
            <LoadingOutlined style={{ fontSize: '80px', color: 'gray' }} />
          </div>
        )}
        <div className="browse-categories__cards">
          {categories?.length &&
            categories.map((category) => (
              <CategoryLink key={category.id} data={category} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default BrowseCategories;
