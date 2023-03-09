import React from 'react';
import './ReviewCard.scss';

interface IReviewCard {
  data: {
    name: string;
    rating: number;
    title: string;
    date: string;
  };
}

const ReviewCard: React.FC<IReviewCard> = ({ data }) => (
  <article className="review-card">
    <p className="review-card__title">{data.title}</p>
  </article>
);

export default ReviewCard;
