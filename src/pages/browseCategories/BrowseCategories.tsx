import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { CategoryController } from 'features/common/category-controller';
import './BrowseCategories.scss';
import { dom } from 'shared/lib';
import { categoriesEndpoints } from 'shared/api/categories.endpoints';
import BlackFridayWidget from 'shared/ui/BlackFridayWidget/BlackFridayWidget';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';

const BrowseCategories = () => {
  dom.useTitle('Просмотр категорий');
  const {
    data: categories,
    error,
    isLoading,
  } = categoriesEndpoints.useCategoriesQuery('');

  return (
    <motion.div
      className="browse-categories"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimationVariants}
    >
      <div className="browse-categories__nav">
        <Breadcrumb separator=" ">
          <Breadcrumb.Item>
            <HomeOutlined /> - Home Page
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <main className="browse-categories__main">
        <CategoryController.Switcher />

        {isLoading && (
          <div className="browse-categories__loader">
            <LoadingOutlined style={{ fontSize: '80px', color: 'gray' }} />
          </div>
        )}
        {error && 'Произошла ошибка'}
        <section className="browse-categories__cards">
          {categories &&
            categories.map((category) => (
              <CategoryController.Link key={category.id} data={category} />
            ))}
        </section>
      </main>
      <BlackFridayWidget />
    </motion.div>
  );
};

export default BrowseCategories;
