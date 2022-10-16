import React, { useEffect } from 'react';
import CategorySwitcher from '../../features/switch-category/ui/CategorySwitcher';
import Header from '../../widgets/Header/Header';
import './BrowseCategories.scss';
import CategoryLink from '../../features/category-link/CategoryLink';

const BrowseCategories = () => {
  useEffect(() => {
    // categoriesApi
    //   .getCategories()
    //   .then((json) => {
    //     console.log('categories:', json);
    //   })
    //   .catch((err) => {
    //     console.error('КАТЕГОРИИ ОШИБКА');
    //     console.log('err categories: ', err);
    //   });
    document.title = 'Просмотр категорий';
  }, []);

  return (
    <>
      <Header />
      <div className="browse-categories">
        <CategorySwitcher />
        <div className="browse-categories__cards">
          <CategoryLink data={{ title: 'Телефоны 1' }} />
          <CategoryLink data={{ title: 'Телефоны 2' }} />
          <CategoryLink data={{ title: 'Телефоны 3' }} />
          <CategoryLink data={{ title: 'Телефоны 4' }} />
          <CategoryLink data={{ title: 'Телефоны 5' }} />
          <CategoryLink data={{ title: 'Телефоны 6' }} />
        </div>
      </div>
    </>
  );
};

export default BrowseCategories;
