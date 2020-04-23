import React, { FC, useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, useHistory } from 'react-router-dom';
import './AccessoryDetailsPage.scss';
import home from '../../img/home.svg';
import { loadAccessoryFromAPI } from '../../util/util';
import { Loader } from '../Loader/Loader';
import heart from '../../img/heart.svg';
import heartLike from '../../img/heart_like.svg';
import {
  addBasketItem,
  deleteFeaturedItem,
  addFeaturedItem,
  loadAccessories,
} from '../../store/actionCreators';

import {
  getAccessories,
  getIsError,
  getPriceById,
  getIsInBasketGood,
  getIsInFeaturedGood,
  getAccessoryById,
} from '../../store/selectors';
import { goodsOptions } from '../../util/enums';

interface Props {
  accessory: Accessory | undefined;
  accessories: Accessory[];
  getLoading: boolean;
  setAccessories: () => void;
  price: [number, number | undefined];
  isInBasket: boolean;
  isInFeatured: boolean;
  addAccessoryInBasket: (payload: {id: string; item: BasketItem}) => void;
  addAccessoryInFutured: (payload: {id: string; item: FeaturedGood}) => void;
  deleteFromFeatured: (payload: string) => void;
}

type TParams = {accessoryId: string}
type fullProps = Props & RouteComponentProps<TParams>

const AccessoryDetailsPage: FC<fullProps> = (props) => {
  const {
    match,
    accessory,
    accessories,
    setAccessories,
    getLoading,
    price,
    isInBasket,
    isInFeatured,
    addAccessoryInBasket,
    deleteFromFeatured,
    addAccessoryInFutured,
  } = props;

  const [
    accessoryData,
    setAccessoryData,
  ] = useState<AccessoryDetails | null>(null);

  const history = useHistory();

  const onBackClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    history.goBack();
  };

  const [currentImg, setCurrentImg] = useState(0);
  const [isAccessoryRequested, setIsAccessoryRequested] = useState(false);

  const onAddButton = () => {
    if (accessoryData) {
      const priceItem = price[1]
        ? Math.floor(price[0] * (100 - price[1]) / 100)
        : price[0];

      const basketItem: BasketItem = {
        img: accessoryData.images[0],
        name: accessoryData.name,
        quantity: 1,
        priceWithDiscount: priceItem,
      };

      addAccessoryInBasket({
        id: accessoryData.id, item: basketItem,
      });
    }
  };

  const onFeaturedHandler = () => {
    if (accessoryData) {
      if (isInFeatured) {
        deleteFromFeatured(accessoryData.id);
      } else if (accessory) {
        const newAccessoryFeatured: FeaturedGood = {
          ...accessory, goodCategory: goodsOptions.accessory,
        };

        addAccessoryInFutured({
          id: accessoryData.id, item: newAccessoryFeatured,
        });
      }
    }
  };

  useEffect(() => {
    if (!accessories.length) {
      setAccessories();
    }

    setCurrentImg(0);
    loadAccessoryFromAPI(match.params.accessoryId)
      .then(
        data => {
          setIsAccessoryRequested(true);

          return setAccessoryData(data);
        },
        () => {
          setAccessoryData(null);
          setIsAccessoryRequested(true);
        },
      );
  }, [match.params.accessoryId, accessories.length, setAccessories]);

  return !accessoryData && !isAccessoryRequested && !getLoading
    ? <Loader />
    : (
      <div className="accessory-details__container">
        <div className="link-chain">
          <Link
            to="/"
            className="mini-link link-chain__item"
          >
            <img src={home} alt="home link" className="mini-link__img" />
          </Link>
          <p className="link-chain__item ">&gt;</p>
          <Link
            to="/accessories"
            className="link-chain__item"
          >
            Accessories
          </Link>
          <p className="link-chain__item">&gt;</p>
          <p className="link-chain__item">
            {accessoryData
              ? accessoryData.name
              : match.params.accessoryId.replace(/_/g, ' ')
            }
          </p>
        </div>
        <div className="link-chain link-chain--min">
          <p className="link-chain__item">&lt;</p>
          <Link
            to="/accessories"
            className="mini-link link-chain__item"
            onClick={onBackClick}
          >
            Back
          </Link>
        </div>
        <p className="accessory-details__title">
          {accessoryData
            ? accessoryData.name
            : match.params.accessoryId.replace(/_/g, ' ')
          }
        </p>
        {!accessoryData
          ? <p>Page not Found</p>
          : (
            <>
              <div className="accessory-details__main-discription-container">
                <div
                  className="accessory-details__imgs-container imgs-container"
                >
                  <ul className="imgs-container__gallery">
                    {accessoryData.images.map((item, i) => {
                      return (
                        <li
                          className={
                            `imgs-container__item${
                              i === currentImg
                                ? ' imgs-container__item--active'
                                : ''
                            }`
                          }
                          key={item}
                          onMouseOver={() => {
                            setCurrentImg(i);
                          }}
                          onFocus={() => {
                            setCurrentImg(i);
                          }}
                        >
                          <img
                            className="imgs-container__img"
                            src={item}
                            alt=""
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="imgs-container__main-img-container">
                    <img
                      src={accessoryData.images[currentImg]}
                      alt="current accessory"
                      className="imgs-container__main-img"
                    />
                  </div>
                </div>
                <div className="accessory-details__main-properties">
                  {!accessoryData.avalibleColors
                    ? ''
                    : (
                      <>
                        <div className="color-container">
                          <p className="color-container__title">
                            Available colors
                          </p>
                          <ul className="color-container__list">
                            {accessoryData.avalibleColors.map(color1 => (
                              <Fragment key={color1.title}>
                                <Link
                                  key={color1.title}
                                  to={`/accessories/${match.params.accessoryId
                                    .replace(
                                      /case_.+/gim,
                                      `case_${color1.title}`,
                                    )}`
                                  }
                                  className={`color-container__outer-border${
                                    color1.title === accessoryData.color
                                      ? ' color-container__outer-border--active'
                                      : ''}`
                                  }
                                >
                                  <div
                                    className="color-container__item"
                                    style={{ backgroundColor: color1.value }}
                                    title={color1.title.replace(/_/g, ' ')}
                                  />
                                </Link>
                              </Fragment>
                            ))}
                          </ul>
                        </div>
                        <hr />
                      </>
                    )}
                  <div className="accessory-details__price-container">
                    {price[1]
                      ? (
                        <p className="accessory-details__price">
                          {Math.floor(price[0] * (100 - price[1]) / 100)}
                        </p>
                      )
                      : <p className="accessory-details__price">{price[0]}</p>
                    }
                    {price[1]
                      ? (
                        <p className="accessory-details__price-old">
                          {price[0]}
                        </p>
                      )
                      : ''
                    }
                  </div>
                  <div className="accessory-details__buttons">
                    <button
                      type="button"
                      className={
                        isInBasket
                          ? 'accessory-details__add-button--in-basket'
                          : 'accessory-details__add-button'
                      }
                      onClick={onAddButton}
                      disabled={isInBasket}
                    >
                      {isInBasket ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      onClick={onFeaturedHandler}
                      className="favorite-button"
                    >
                      <img
                        src={isInFeatured ? heartLike : heart}
                        alt="favorite button"
                        className="accessory-details__favorite-button"
                      />
                    </button>
                  </div>
                  <div className="accessory-details__main-container">
                    <div className="accessory__details details">
                      <p className="details__title">Color</p>
                      <p className="details__value">
                        {accessoryData.color.replace(/_/, ' ')}
                      </p>
                    </div>
                    <div className="accessory__details details">
                      <p className="details__title">For model</p>
                      <p className="details__value">
                        {accessoryData.forModel}
                      </p>
                    </div>
                    <div className="accessory__details details">
                      <p className="details__title">Prodused by</p>
                      <p className="details__value">
                        {accessoryData.produced}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
              <p className="accessory-details__id">
                ID:
                {accessoryData.id}
              </p>
              <div className="accessory-details__description-container">
                <div className="accessory-details__about about">
                  <p className="about__main-title">About</p>
                  {accessoryData.description.map(item => (
                    <Fragment key={item.title}>
                      <p className="about__title">
                        {item.title}
                      </p>
                      <p className="about__text">
                        {item.text}
                      </p>
                    </Fragment>
                  ))}

                </div>
              </div>
            </>
          )
        }
      </div>

    );
};

const dispatchMapToProps = {
  setAccessories: loadAccessories,
  addAccessoryInBasket: addBasketItem,
  deleteFromFeatured: deleteFeaturedItem,
  addAccessoryInFutured: addFeaturedItem,
};

const mapStateToProps = (
  state: PhoneCatalogStore,
  ownProps: RouteComponentProps<TParams>,
) => {
  const { accessoryId } = ownProps.match.params;

  return {
    accessories: getAccessories(state),
    getLoading: getIsError(state),
    price: getPriceById(state, accessoryId, goodsOptions.accessory),
    isInBasket: getIsInBasketGood(state, accessoryId),
    isInFeatured: getIsInFeaturedGood(state, accessoryId),
    accessory: getAccessoryById(state, accessoryId),
  };
};

export default connect(
  mapStateToProps,
  dispatchMapToProps,
)(AccessoryDetailsPage);
