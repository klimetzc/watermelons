import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import CategorySwitcher from '../../features/switch-category/ui/CategorySwitcher';
import CategoryLink from '../../features/category-link/CategoryLink';
import categoriesApi from '../../shared/api/categories';
import './BrowseCategories.scss';
import { ICategory } from '../../shared/api/types/interfaces';

const BrowseCategories = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Просмотр категорий';
    setIsLoading(true);

    categoriesApi
      .getCategories()
      .then((json) => {
        setCategories(json);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
        <section className="browse-categories__cards">
          {categories?.length &&
            categories.map((category) => (
              <CategoryLink key={category.id} data={category} />
            ))}
        </section>
      </main>
    </div>
  );
};

export default BrowseCategories;
