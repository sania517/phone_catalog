import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Phone.scss';
import heart from '../../img/heart.svg';
import heartLike from '../../img/heart_like.svg';
import {
  addBasketItem,
  deleteFeaturedItem,
  addFeaturedItem,
} from '../../store/actionCreators';
import { getIsInBasketGood, getIsInFeaturedGood } from '../../store/selectors';

interface Props {
  phone: Phone;
  isInBasket: boolean;
  isInFeatured: boolean;
  addPhoneInBasket: (payload: {id: string; item: BasketItem}) => void;
  addPhoneInFutured: (payload: {id: string; item: FeaturedGood}) => void;
  deleteFromFeatured: (payload: string) => void;
}

interface OwnProps {
  phone: Phone;
}

const Phone: FC<Props> = (props) => {
  const {
    phone,
    addPhoneInBasket,
    isInBasket,
    isInFeatured,
    deleteFromFeatured,
    addPhoneInFutured,
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
  } = phone;

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

    addPhoneInBasket({
      id, item: basketItem,
    });
  };

  const onFeaturedHandler = () => {
    if (isInFeatured) {
      deleteFromFeatured(id);
    } else {
      const newPhoneFeatured = {
        ...phone, goodCategory: 'phone',
      };

      addPhoneInFutured({
        id, item: newPhoneFeatured,
      });
    }
  };

  return (
    <div className="phone">
      <Link to={`/phones/${id}`} className="phone__img-container">
        <img src={imageUrl} alt="phone" className="phone__img" />
      </Link>
      <Link to={`/phones/${id}`} className="phone__title-link">
        <p className="phone__title">{name}</p>
      </Link>
      <div className="phone__price">
        <h2 className="phone__discount">
          {regularPrice && discount
            ? Math.floor(+(regularPrice) * (1 - discount / 100))
            : regularPrice }
        </h2>

        {regularPrice && discount
          ? <h2 className="phone__regular-price">{regularPrice}</h2>
          : ''
        }
      </div>
      <div className="phone__details details">
        <p className="details__title">Screen</p>
        <p className="details__value">
          {screenSize ? `${screenSize}"` : ''}
          {' '}
          {screenType}
        </p>
      </div>
      <div className="phone__details details">
        <p className="details__title">Capacity</p>
        <p className="details__value">{flash}</p>
      </div>
      <div className="phone__details details">
        <p className="details__title">RAM</p>
        <p className="details__value">{ram}</p>
      </div>
      <div className="phone__buttons">
        <button
          type="button"
          disabled={isInBasket}
          className={isInBasket
            ? 'phone__add-button--in-basket'
            : 'phone__add-button'
          }
          onClick={onAddButton}
        >
          {isInBasket ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          onClick={onFeaturedHandler}
          className="phone__favorite-button"
        >
          <img
            src={
              isInFeatured
                ? heartLike
                : heart
            }
            alt="favorite button"
            className="phone__favorite-button-img"
          />
        </button>
      </div>
    </div>
  );
};

const dispatchMapToProps = {
  addPhoneInBasket: addBasketItem,
  deleteFromFeatured: deleteFeaturedItem,
  addPhoneInFutured: addFeaturedItem,
};

const mapStateToProps = (state: PhoneCatalogStore, ownProps: OwnProps) => {
  const { id } = ownProps.phone;

  return {
    isInBasket: getIsInBasketGood(state, id),
    isInFeatured: getIsInFeaturedGood(state, id),
  };
};

export default connect(mapStateToProps, dispatchMapToProps)(Phone);
