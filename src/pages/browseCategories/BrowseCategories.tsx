import React, { useEffect, useState } from 'react';
import CategorySwitcher from '../../features/switch-category/ui/CategorySwitcher';
import Header from '../../widgets/Header/Header';
import './BrowseCategories.scss';
import CategoryLink from '../../features/category-link/CategoryLink';
import categoriesApi from '../../shared/api/categories';

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
        <CategorySwitcher />
        <div className="browse-categories__cards">
          <CategoryLink data={{ title: 'Телефоны 1', id: 1 }} />
          <CategoryLink data={{ title: 'Телефоны 2', id: 2 }} />
          <CategoryLink data={{ title: 'Телефоны 3', id: 3 }} />
          <CategoryLink data={{ title: 'Телефоны 4', id: 4 }} />
          <CategoryLink data={{ title: 'Телефоны 5', id: 5 }} />
          <CategoryLink data={{ title: 'Телефоны 6', id: 6 }} />
          <div>
            categories data:{' '}
            {categories?.length || 'Вернуло пустой массив либо null'}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseCategories;
