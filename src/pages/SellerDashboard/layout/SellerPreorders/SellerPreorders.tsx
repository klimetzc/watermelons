import React from 'react';
import { Preorder } from 'entities/preorder';
import { IProduct } from 'shared/api/types/interfaces';
import './SellerPreorders.scss';

interface IProps {
  viewProducts: IProduct[] | null | undefined;
  emptyMessage: string;
  label: string;
}

const SellerPreorders: React.FC<IProps> = ({
  viewProducts,
  emptyMessage,
  label,
}) => (
  <div className="seller-dashboard__preorders">
    <h3 className="seller-dashboard__preorders-title">{label}:</h3>
    <div className="seller-dashboard__preorders-list">
      {viewProducts?.length ? (
        viewProducts.map((item) => (
          <Preorder.Card id={item.id} rootLink="dashboard" key={item.id} />
        ))
      ) : (
        <p className="seller-dashboard__preorders-empty">{emptyMessage}</p>
      )}
    </div>
  </div>
);

export default SellerPreorders;
