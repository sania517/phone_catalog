import React, { FC } from 'react'
import './Basket.scss'
import { Link } from 'react-router-dom'
import { deleteBasketItem, getBasket, getSumFromBasket, getCountAllGoodsInBasket } from '../../store/store'
import { connect } from 'react-redux'
import BasketItemList from '../BasketItemList/BasketItemList'

interface Props {
  //goods: BasketItem[];
  sum: number;
  countGoods: number
  //deleteGoods: (id: string) => void;
}

const Basket:FC<Props> = (props) => {
  console.log('sum', props.sum)

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
          <p className="basket__checkout-count">Total for {props.countGoods} items</p>
          <hr/>
          <button className="basket__checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  )
}

const dispatchMapToProps = {
  //deleteGoods: deleteBasketItem,
}

const mapStateToProps = (state:PhoneCatalogStore) => ({
  //goods: getBasket(state),
  sum: getSumFromBasket(state),
  countGoods: getCountAllGoodsInBasket(state),
})

export default connect( mapStateToProps, dispatchMapToProps)(Basket)
