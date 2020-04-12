import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Tablet.scss';
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
  tablet: Tablet;
  isInBasket: boolean;
  isInFeatured: boolean;
  addTabletInBasket: (payload: {id: string; item: BasketItem}) => void;
  addTabletInFutured: (payload: {id: string; item: FeaturedGood}) => void;
  deleteFromFeatured: (payload: string) => void;
}

interface OwnProps {
  tablet: Tablet;
}

const Tablet: FC<Props> = (props) => {
  const {
    tablet,
    addTabletInBasket,
    isInBasket,
    isInFeatured,
    deleteFromFeatured,
    addTabletInFutured,
  } = props;

  const {
    id,
    imageUrl,
    name,
    regularPrice,
    discount,
    screenSize,
    screenType,
    flash,
    ram,
  } = tablet;

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

    addTabletInBasket({
      id, item: basketItem,
    });
  };

  const onFeaturedHandler = () => {
    if (isInFeatured) {
      deleteFromFeatured(id);
    } else {
      const newTabletFeatured = {
        ...tablet, goodCategory: goodsOptions.tablet,
      };

      addTabletInFutured({
        id, item: newTabletFeatured,
      });
    }
  };

  return (
    <div className="tablet">
      <Link to={`/tablets/${id}`} className="tablet__img-container">
        <img src={imageUrl} alt="tablet" className="tablet__img" />
      </Link>
      <Link to={`/tablets/${id}`} className="tablet__title">
        {name}
      </Link>
      <div className="tablet__price">
        <h2 className="tablet__discount">
          {regularPrice && discount
            ? Math.floor(+(regularPrice) * (1 - discount / 100))
            : regularPrice }
        </h2>

        {regularPrice && discount
          ? <h2 className="tablet__regular-price">{regularPrice}</h2>
          : ''
        }
      </div>
      <div className="tablet__details details">
        <p className="details__title">RAM</p>
        <p className="details__value">{ram}</p>
      </div>
      <div className="tablet__details details">
        <p className="details__title">Capacity</p>
        <p className="details__value">{flash}</p>
      </div>
      <div className="tablet__details details">
        <p className="details__title">Screen</p>
        <p className="details__value">
          {screenSize ? `${screenSize}"` : ''}
          {' '}
          {screenType}
        </p>
      </div>
      <div className="tablet__buttons">
        <button
          type="button"
          disabled={isInBasket}
          className={isInBasket
            ? 'tablet__add-button--in-basket'
            : 'tablet__add-button'
          }
          onClick={onAddButton}
        >
          {isInBasket ? 'Added to cart' : 'Add to cart'}
        </button>
        <button type="button" onClick={onFeaturedHandler}>
          <img
            src={isInFeatured
              ? heartLike
              : heart
            }
            alt="favorite button"
            className="tablet__favorite-button"
          />
        </button>
      </div>
    </div>
  );
};

const dispatchMapToProps = {
  addTabletInBasket: addBasketItem,
  deleteFromFeatured: deleteFeaturedItem,
  addTabletInFutured: addFeaturedItem,
};

const mapStateToProps = (state: PhoneCatalogStore, ownProps: OwnProps) => {
  const { id } = ownProps.tablet;

  return {
    isInBasket: getIsInBasketGood(state, id),
    isInFeatured: getIsInFeaturedGood(state, id),
  };
};

export default connect(mapStateToProps, dispatchMapToProps)(Tablet);
