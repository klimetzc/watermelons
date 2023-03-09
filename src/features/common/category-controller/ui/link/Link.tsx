import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './Link.scss';

interface categoryCardData {
  title: string;
  id: number;
}

interface ICategoryLink {
  data: categoryCardData;
}

export const Link: React.FC<ICategoryLink> = ({ data }) => (
  <RouterLink to={`/categories/${data.id}/products`} className="category-link">
    <div className="category-link__card">
      <div className="category-link__image" />
      <div className="category-link__title">{data.title}</div>
    </div>
  </RouterLink>
);
