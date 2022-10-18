import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import CategorySwitcher from '../../features/switch-category/ui/CategorySwitcher';
import Header from '../../widgets/Header/Header';
import CategoryLink from '../../features/category-link/CategoryLink';
import categoriesApi from '../../shared/api/categories';
import './BrowseCategories.scss';

interface ICategory {
  id: number;
  title: string;
}

const BrowseCategories = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    categoriesApi
      .getCategories()
      .then((json) => {
        console.log('categories:', json);
        setCategories(json);
      })
      .catch((err) => {
        console.error('КАТЕГОРИИ ОШИБКА');
        console.log('err categories: ', err);
      });
    document.title = 'Просмотр категорий';
  }, []);

  return (
    <>
      <Header />
      <div className="browse-categories">
        <nav className="browse-categories__nav">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/welcome">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Категории</Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <main className="browse-categories__main">
          <CategorySwitcher />
          <div className="browse-categories__cards">
            {categories?.length ? (
              categories.map((category) => (
                <CategoryLink key={category.id} data={category} />
              ))
            ) : (
              <>
                <CategoryLink data={{ title: 'Тест 1', id: 1 }} />
                <CategoryLink data={{ title: 'Тест 2', id: 2 }} />
              </>
            )}

            {/* <div>
              categories data:{' '}
              {categories?.length || 'Вернуло пустой массив либо null'}
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default BrowseCategories;
