import React, { FC } from 'react';
import './Basket.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BasketItemList from '../BasketItemList/BasketItemList';
import {
  getSumFromBasket,
  getCountAllGoodsInBasket,
} from '../../store/selectors';

interface Props {
  sum: number;
  countGoods: number;
}

const Basket: FC<Props> = (props) => {
  return (
    <div className="basket">
      <div className="link-chain link-chain--min">
        <p className="link-chain__item">&lt;</p>
        <Link
          to="/"
          className="mini-link link-chain__item"
        >
          Back
        </Link>
      </div>
      <h1 className="basket__title">Cart</h1>
      <div className="basket__main-container">
        <BasketItemList />
        <div className="basket__checkout">
          <p className="basket__checkout-sum">{props.sum}</p>
          <p className="basket__checkout-count">
            {`Total for ${props.countGoods} items`}
          </p>
          <hr />
          <button
            type="button"
            className="basket__checkout-button"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const dispatchMapToProps = {
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  sum: getSumFromBasket(state),
  countGoods: getCountAllGoodsInBasket(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Basket);
