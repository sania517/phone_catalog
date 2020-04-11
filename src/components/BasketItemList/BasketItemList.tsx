import React, { FC } from 'react';
import './BasketItemList.scss';

import { connect } from 'react-redux';
import BasketItem from '../BasketItem/BasketItem';
import { deleteBasketItem } from '../../store/actionCreators';
import { getBasket } from '../../store/selectors';

interface Props {
  goods: [string, BasketItem][];
  onDelete: (id: string) => void;
}

const BasketItemList: FC<Props> = ({ goods, onDelete }) => {
  return (
    <ul className="basket__goodList">
      {!goods.length ? 'Cart is empty now' : ''}
      {goods.map(good => (
        <li className="basket__list-item" key={good[0]}>
          <BasketItem good={good} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

const dispatchMapToProps = {
  onDelete: deleteBasketItem,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  goods: getBasket(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(BasketItemList);
