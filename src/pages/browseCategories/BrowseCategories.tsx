import React from 'react';
import CategorySwitcher from '../../features/switch-category/ui/CategorySwitcher';
import Header from '../../widgets/Header/Header';
import './BrowseCategories.scss';

const BrowseCategories = () => (
  <div className="browse-categories">
    <Header />
    <CategorySwitcher />
  </div>
);

export default BrowseCategories;
