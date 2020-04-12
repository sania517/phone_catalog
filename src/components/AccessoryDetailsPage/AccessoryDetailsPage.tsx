import React, { FC, useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
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
  }, [match.params.accessoryId, accessories.length]);

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
                  <div className="color-container">
                    <p className="color-container__title">Available colors</p>
                    <ul className="color-container__list">
                      {accessoryData.avalibleColors.map(color1 => (
                        <Fragment key={color1.title}>
                          <Link
                            key={color1.title}
                            to={`/accessories/${match.params.accessoryId
                              .replace(/gb_.+/gim, `gb_${color1.title}`)}`
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
                  <div className="memory-container">
                    <p className="memory-container__title">Select capacity</p>
                    <ul className="memory-container__list">
                      {accessoryData.storage.availableFlash.map(item => (
                        <li
                          key={item}
                          className={`memory-container__item${
                            accessoryData.storage.flash === item
                              ? ' memory-container__item--active'
                              : ''}`}
                        >
                          <Link
                            to={`/accessories/${match.params.accessoryId
                              .replace(/_\d*gb_/gi, `_${item}_`
                                .toLowerCase())}`
                            }
                            className={`memory-container__link${
                              accessoryData.storage.flash === item
                                ? ' memory-container__link--active'
                                : ''}`}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
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
                      <p className="details__title">Screen</p>
                      <p className="details__value">
                        {accessoryData.display.screenSize
                          ? `${accessoryData.display.screenSize.split(' ')[0]}"`
                          : ''
                        }
                        {' '}
                        {accessoryData.display.typeScreen}
                      </p>
                    </div>
                    <div className="accessory__details details">
                      <p className="details__title">Resolution</p>
                      <p className="details__value">
                        {accessoryData.display.screenResolution}
                      </p>
                    </div>
                    <div className="accessory__details details">
                      <p className="details__title">Processor</p>
                      <p className="details__value">
                        {accessoryData.processor}
                      </p>
                    </div>
                    <div className="accessory__details details">
                      <p className="details__title">RAM</p>
                      <p className="details__value">
                        {accessoryData.storage.ram}
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
                <div className="accessory-details__tech-specs tech-specs">
                  <p className="tech-specs__title">Tech specs</p>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Screen</p>
                    <p className="tech-specs__value">
                      {accessoryData.display.screenSize
                        ? `${accessoryData.display.screenSize.split(' ')[0]}"`
                        : ''
                      }
                      {' '}
                      {accessoryData.display.typeScreen}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Resolution</p>
                    <p className="tech-specs__value">
                      {accessoryData.display.screenResolution}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Processor</p>
                    <p className="tech-specs__value">
                      {accessoryData.processor}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">RAM</p>
                    <p className="tech-specs__value">
                      {accessoryData.storage.ram}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Built in memory</p>
                    <p className="tech-specs__value">
                      {accessoryData.storage.flash}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Camera</p>
                    <p className="tech-specs__value">
                      {accessoryData.camera.primary}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Zoom</p>
                    <p className="tech-specs__value">
                      {accessoryData.camera.zoom}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Cell</p>
                    <p className="tech-specs__value">
                      {accessoryData.connectivity.cell}
                    </p>
                  </div>
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
