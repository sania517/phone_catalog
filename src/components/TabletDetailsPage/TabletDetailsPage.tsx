import React, { FC, useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import './TabletDetailsPage.scss';
import home from '../../img/home.svg';
import { loadTabletFromAPI } from '../../util/util';
import { Loader } from '../Loader/Loader';
import heart from '../../img/heart.svg';
import heartLike from '../../img/heart_like.svg';
import {
  addBasketItem,
  deleteFeaturedItem,
  addFeaturedItem,
  loadTablets,
} from '../../store/actionCreators';

import {
  getTablets,
  getIsError,
  getPriceById,
  getIsInBasketGood,
  getIsInFeaturedGood,
  getTabletById,
} from '../../store/selectors';
import { goodsOptions } from '../../util/enums';

interface Props {
  tablet: Tablet | undefined;
  tablets: Tablet[];
  getLoading: boolean;
  setTablets: () => void;
  price: [number, number | undefined];
  isInBasket: boolean;
  isInFeatured: boolean;
  addTabletInBasket: (payload: {id: string; item: BasketItem}) => void;
  addTabletInFutured: (payload: {id: string; item: FeaturedGood}) => void;
  deleteFromFeatured: (payload: string) => void;
}

type TParams = {tabletId: string}

const TabletDetailsPage: FC<RouteComponentProps<TParams> & Props> = (props) => {
  const {
    match,
    tablet,
    tablets,
    setTablets,
    getLoading,
    price,
    isInBasket,
    isInFeatured,
    addTabletInBasket,
    deleteFromFeatured,
    addTabletInFutured,
  } = props;

  const [tabletData, setTabletData] = useState<TabletDetails | null>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [isTabletRequested, setIsTabletRequested] = useState(false);

  const onAddButton = () => {
    if (tabletData) {
      const priceItem = price[1]
        ? Math.floor(price[0] * (100 - price[1]) / 100)
        : price[0];

      const basketItem: BasketItem = {
        img: tabletData.images[0],
        name: tabletData.name,
        quantity: 1,
        priceWithDiscount: priceItem,
      };

      addTabletInBasket({
        id: tabletData.id, item: basketItem,
      });
    }
  };

  const onFeaturedHandler = () => {
    if (tabletData) {
      if (isInFeatured) {
        deleteFromFeatured(tabletData.id);
      } else if (tablet) {
        const newTabletFeatured: FeaturedGood = {
          ...tablet, goodCategory: goodsOptions.tablet,
        };

        addTabletInFutured({
          id: tabletData.id, item: newTabletFeatured,
        });
      }
    }
  };

  useEffect(() => {
    if (!tablets.length) {
      setTablets();
    }

    setCurrentImg(0);
    loadTabletFromAPI(match.params.tabletId)
      .then(
        data => {
          setIsTabletRequested(true);

          return setTabletData(data);
        },
        () => {
          setTabletData(null);
          setIsTabletRequested(true);
        },
      );
  }, [match.params.tabletId, tablets.length]);

  return !tabletData && !isTabletRequested && !getLoading
    ? <Loader />
    : (
      <div className="tablet-details__container">
        <div className="link-chain">
          <Link
            to="/"
            className="mini-link link-chain__item"
          >
            <img src={home} alt="home link" className="mini-link__img" />
          </Link>
          <p className="link-chain__item ">&gt;</p>
          <Link
            to="/tablets"
            className="link-chain__item"
          >
            Tablets
          </Link>
          <p className="link-chain__item">&gt;</p>
          <p className="link-chain__item">
            {tabletData
              ? tabletData.name
              : match.params.tabletId.replace(/_/g, ' ')
            }
          </p>
        </div>
        <div className="link-chain link-chain--min">
          <p className="link-chain__item">&lt;</p>
          <Link
            to="/tablets"
            className="mini-link link-chain__item"
          >
            Back
          </Link>
        </div>
        <p className="tablet-details__title">
          {tabletData
            ? tabletData.name
            : match.params.tabletId.replace(/_/g, ' ')
          }
        </p>
        {!tabletData
          ? <p>Page not Found</p>
          : (
            <>
              <div className="tablet-details__main-discription-container">
                <div className="tablet-details__imgs-container imgs-container">
                  <ul className="imgs-container__gallery">
                    {tabletData.images.map((item, i) => {
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
                      src={tabletData.images[currentImg]}
                      alt="current tablet"
                      className="imgs-container__main-img"
                    />
                  </div>
                </div>
                <div className="tablet-details__main-properties">
                  <div className="color-container">
                    <p className="color-container__title">Available colors</p>
                    <ul className="color-container__list">
                      {tabletData.avalibleColors.map(color1 => (
                        <Fragment key={color1.title}>
                          <Link
                            key={color1.title}
                            to={`/tablets/${match.params.tabletId
                              .replace(/gb_.+/gim, `gb_${color1.title}`)}`
                            }
                            className={`color-container__outer-border${
                              color1.title === tabletData.color
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
                      {tabletData.storage.availableFlash.map(item => (
                        <li
                          key={item}
                          className={`memory-container__item${
                            tabletData.storage.flash === item
                              ? ' memory-container__item--active'
                              : ''}`}
                        >
                          <Link
                            to={`/tablets/${match.params.tabletId
                              .replace(/_\d*gb_/gi, `_${item}_`
                                .toLowerCase())}`
                            }
                            className={`memory-container__link${
                              tabletData.storage.flash === item
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
                  <div className="tablet-details__price-container">
                    {price[1]
                      ? (
                        <p className="tablet-details__price">
                          {Math.floor(price[0] * (100 - price[1]) / 100)}
                        </p>
                      )
                      : <p className="tablet-details__price">{price[0]}</p>
                    }
                    {price[1]
                      ? <p className="tablet-details__price-old">{price[0]}</p>
                      : ''
                    }
                  </div>
                  <div className="tablet-details__buttons">
                    <button
                      type="button"
                      className={
                        isInBasket
                          ? 'tablet-details__add-button--in-basket'
                          : 'tablet-details__add-button'
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
                        className="tablet-details__favorite-button"
                      />
                    </button>
                  </div>
                  <div className="tablet-details__main-container">
                    <div className="tablet__details details">
                      <p className="details__title">Screen</p>
                      <p className="details__value">
                        {tabletData.display.screenSize
                          ? `${tabletData.display.screenSize.split(' ')[0]}"`
                          : ''
                        }
                        {' '}
                        {tabletData.display.typeScreen}
                      </p>
                    </div>
                    <div className="tablet__details details">
                      <p className="details__title">Resolution</p>
                      <p className="details__value">
                        {tabletData.display.screenResolution}
                      </p>
                    </div>
                    <div className="tablet__details details">
                      <p className="details__title">Processor</p>
                      <p className="details__value">{tabletData.processor}</p>
                    </div>
                    <div className="tablet__details details">
                      <p className="details__title">RAM</p>
                      <p className="details__value">{tabletData.storage.ram}</p>
                    </div>

                  </div>
                </div>
              </div>
              <p className="tablet-details__id">
ID:
                {tabletData.id}
              </p>
              <div className="tablet-details__description-container">
                <div className="tablet-details__about about">
                  <p className="about__main-title">About</p>
                  {tabletData.description.map(item => (
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
                <div className="tablet-details__tech-specs tech-specs">
                  <p className="tech-specs__title">Tech specs</p>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Screen</p>
                    <p className="tech-specs__value">
                      {tabletData.display.screenSize
                        ? `${tabletData.display.screenSize.split(' ')[0]}"`
                        : ''
                      }
                      {' '}
                      {tabletData.display.typeScreen}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Resolution</p>
                    <p className="tech-specs__value">
                      {tabletData.display.screenResolution}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Processor</p>
                    <p className="tech-specs__value">{tabletData.processor}</p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">RAM</p>
                    <p className="tech-specs__value">
                      {tabletData.storage.ram}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Built in memory</p>
                    <p className="tech-specs__value">
                      {tabletData.storage.flash}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Camera</p>
                    <p className="tech-specs__value">
                      {tabletData.camera.primary}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Zoom</p>
                    <p className="tech-specs__value">
                      {tabletData.camera.zoom}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Cell</p>
                    <p className="tech-specs__value">
                      {tabletData.connectivity.cell}
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
  setTablets: loadTablets,
  addTabletInBasket: addBasketItem,
  deleteFromFeatured: deleteFeaturedItem,
  addTabletInFutured: addFeaturedItem,
};

const mapStateToProps = (
  state: PhoneCatalogStore,
  ownProps: RouteComponentProps<TParams>,
) => {
  const { tabletId } = ownProps.match.params;

  return {
    tablets: getTablets(state),
    getLoading: getIsError(state),
    price: getPriceById(state, tabletId, goodsOptions.tablet),
    isInBasket: getIsInBasketGood(state, tabletId),
    isInFeatured: getIsInFeaturedGood(state, tabletId),
    tablet: getTabletById(state, tabletId),
  };
};

export default connect(mapStateToProps, dispatchMapToProps)(TabletDetailsPage);
