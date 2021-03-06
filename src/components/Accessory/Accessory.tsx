import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Accessory.scss';
import heart from '../../img/heart.svg';
import heartLike from '../../img/heart_like.svg';
import {
  addBasketItem,
  deleteFeaturedItem,
  addFeaturedItem,
} from '../../store/actionCreators';
import { getIsInBasketGood, getIsInFeaturedGood } from '../../store/selectors';
import { goodsOptions } from '../../util/enums';

interface Props {
  accessory: Accessory;
  isInBasket: boolean;
  isInFeatured: boolean;
  addAccessoryInBasket: (payload: {id: string; item: BasketItem}) => void;
  addAccessoryInFutured: (payload: {id: string; item: FeaturedGood}) => void;
  deleteFromFeatured: (payload: string) => void;
}

interface OwnProps {
  accessory: Accessory;
}

const Accessory: FC<Props> = (props) => {
  const {
    accessory,
    addAccessoryInBasket,
    isInBasket,
    isInFeatured,
    deleteFromFeatured,
    addAccessoryInFutured,
  } = props;

  const {
    id,
    imageUrl,
    name,
    regularPrice,
    discount,
    color,
    forModel,
    produced,
  } = accessory;

  const onAddButton = () => {
    const price = discount
      ? Math.floor(regularPrice * (100 - discount) / 100)
      : regularPrice;
    const basketItem: BasketItem = {
      img: imageUrl,
      name,
      quantity: 1,
      priceWithDiscount: price,
    };

    addAccessoryInBasket({
      id, item: basketItem,
    });
  };

  const onFeaturedHandler = () => {
    if (isInFeatured) {
      deleteFromFeatured(id);
    } else {
      const newAccessoryFeatured = {
        ...accessory, goodCategory: goodsOptions.accessory,
      };

      addAccessoryInFutured({
        id, item: newAccessoryFeatured,
      });
    }
  };

  return (
    <div className="accessory">
      <Link to={`/accessories/${id}`} className="accessory__img-container">
        <img src={imageUrl} alt="accessory" className="accessory__img" />
      </Link>
      <Link to={`/accessories/${id}`} className="accessory__title-link">
        <p className="accessory__title">{name}</p>
      </Link>
      <div className="accessory__price">
        <h2 className="accessory__discount">
          {regularPrice && discount
            ? Math.floor(+(regularPrice) * (1 - discount / 100))
            : regularPrice }
        </h2>

        {regularPrice && discount
          ? <h2 className="accessory__regular-price">{regularPrice}</h2>
          : ''
        }
      </div>
      <div className="accessory__details details">
        <p className="details__title">Color:</p>
        <p className="details__value">
          {color ? `${color}"` : ''}
        </p>
      </div>
      <div className="accessory__details details">
        <p className="details__title">For model</p>
        <p className="details__value">{forModel}</p>
      </div>
      <div className="accessory__details details">
        <p className="details__title">Produced by</p>
        <p className="details__value">{produced}</p>
      </div>
      <div className="accessory__buttons">
        <button
          type="button"
          disabled={isInBasket}
          className={isInBasket
            ? 'accessory__add-button--in-basket'
            : 'accessory__add-button'
          }
          onClick={onAddButton}
        >
          {isInBasket ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          onClick={onFeaturedHandler}
          className="accessory__favorite-button"
        >
          <img
            src={isInFeatured
              ? heartLike
              : heart
            }
            alt="favorite button"
            className="accessory__favorite-button-img"
          />
        </button>
      </div>
    </div>
  );
};

const dispatchMapToProps = {
  addAccessoryInBasket: addBasketItem,
  deleteFromFeatured: deleteFeaturedItem,
  addAccessoryInFutured: addFeaturedItem,
};

const mapStateToProps = (state: PhoneCatalogStore, ownProps: OwnProps) => {
  const { id } = ownProps.accessory;

  return {
    isInBasket: getIsInBasketGood(state, id),
    isInFeatured: getIsInFeaturedGood(state, id),
  };
};

export default connect(mapStateToProps, dispatchMapToProps)(Accessory);
