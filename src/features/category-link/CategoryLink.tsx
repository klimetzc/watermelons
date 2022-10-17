import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryLink.scss';

interface categoryCardData {
  title: string;
  id: number;
}

interface ICategoryLink {
  data: categoryCardData;
}

const CategoryLink: React.FC<ICategoryLink> = ({ data }) => (
  <Link to={`/categories/${data.id}/products`}>
    <div className="category-link__card">
      <div className="category-link__image" />
      <div className="category-link__title">{data.title}</div>
    </div>
  </Link>
);

export default CategoryLink;
