import React, { FC, useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link, useHistory } from 'react-router-dom';
import './PhoneDetailsPage.scss';
import home from '../../img/home.svg';
import { loadPhoneFromAPI } from '../../util/util';
import { Loader } from '../Loader/Loader';
import heart from '../../img/heart.svg';
import heartLike from '../../img/heart_like.svg';
import {
  addBasketItem,
  deleteFeaturedItem,
  addFeaturedItem,
  loadPhones,
} from '../../store/actionCreators';

import {
  getPhones,
  getIsError,
  getPriceById,
  getIsInBasketGood,
  getIsInFeaturedGood,
  getPhoneById,
} from '../../store/selectors';
import { goodsOptions } from '../../util/enums';
import { ImagesContainer } from '../ImagesContainer/ImagesContainer';
import { MemoryContainer } from '../MemoryContainer/MemoryContainer';

interface Props {
  phone: Phone | undefined;
  phones: Phone[];
  getLoading: boolean;
  setPhones: () => void;
  price: [number, number | undefined];
  isInBasket: boolean;
  isInFeatured: boolean;
  addPhoneInBasket: (payload: {id: string; item: BasketItem}) => void;
  addPhoneInFutured: (payload: {id: string; item: FeaturedGood}) => void;
  deleteFromFeatured: (payload: string) => void;
}

type TParams = {phoneId: string}

const PhoneDetailsPage: FC<RouteComponentProps<TParams> & Props> = (props) => {
  const {
    match,
    phone,
    phones,
    setPhones,
    getLoading,
    price,
    isInBasket,
    isInFeatured,
    addPhoneInBasket,
    deleteFromFeatured,
    addPhoneInFutured,
  } = props;

  const [phoneData, setPhoneData] = useState<PhoneDetails | null>(null);
  const [isPhoneRequested, setIsPhoneRequested] = useState(false);
  const history = useHistory();

  const onBackClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    history.goBack();
  };

  const onAddButton = () => {
    if (phoneData) {
      const priceItem = price[1]
        ? Math.floor(price[0] * (100 - price[1]) / 100)
        : price[0];

      const basketItem: BasketItem = {
        img: phoneData.images[0],
        name: phoneData.name,
        quantity: 1,
        priceWithDiscount: priceItem,
      };

      addPhoneInBasket({
        id: phoneData.id, item: basketItem,
      });
    }
  };

  const onFeaturedHandler = () => {
    if (phoneData) {
      if (isInFeatured) {
        deleteFromFeatured(phoneData.id);
      } else if (phone) {
        const newPhoneFeatured: FeaturedGood = {
          ...phone, goodCategory: goodsOptions.phone,
        };

        addPhoneInFutured({
          id: phoneData.id, item: newPhoneFeatured,
        });
      }
    }
  };

  useEffect(() => {
    if (!phones.length) {
      setPhones();
    }

    loadPhoneFromAPI(match.params.phoneId)
      .then(
        data => {
          setIsPhoneRequested(true);

          return setPhoneData(data);
        },
        () => {
          setPhoneData(null);
          setIsPhoneRequested(true);
        },
      );
  }, [match.params.phoneId, phones.length, setPhones]);

  return !phoneData && !isPhoneRequested && !getLoading
    ? <Loader />
    : (
      <div className="phone-details__container">
        <div className="link-chain">
          <Link
            to="/"
            className="mini-link link-chain__item"
          >
            <img src={home} alt="home link" className="mini-link__img" />
          </Link>
          <p className="link-chain__item ">&gt;</p>
          <Link
            to="/phones"
            className="link-chain__item"
          >
          Phones
          </Link>
          <p className="link-chain__item">&gt;</p>
          <p className="link-chain__item">
            {phoneData
              ? phoneData.name
              : match.params.phoneId.replace(/_/g, ' ')
            }
          </p>
        </div>
        <div className="link-chain link-chain--min">
          <p className="link-chain__item">&lt;</p>
          <Link
            to="/phones"
            className="mini-link link-chain__item"
            onClick={onBackClick}
          >
            Back
          </Link>
        </div>
        <p className="phone-details__title">
          {phoneData
            ? phoneData.name
            : match.params.phoneId.replace(/_/g, ' ')
          }
        </p>
        {!phoneData
          ? <p>Page not Found</p>
          : (
            <>
              <div className="phone-details__main-discription-container">
                <ImagesContainer images={phoneData.images} />
                <div className="phone-details__main-properties">
                  <div className="color-container">
                    <p className="color-container__title">Available colors</p>
                    <ul className="color-container__list">
                      {phoneData.avalibleColors.map(color1 => (
                        <Fragment key={color1.title}>
                          <Link
                            key={color1.title}
                            to={`/phones/${match.params.phoneId
                              .replace(/gb_.+/gim, `gb_${color1.title}`)}`
                            }
                            className={`color-container__outer-border${
                              color1.title === phoneData.color
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
                  <MemoryContainer
                    flashOptions={phoneData.storage.availableFlash}
                    currentFlash={phoneData.storage.flash}
                  />
                  <div className="phone-details__price-container">
                    {price[1]
                      ? (
                        <p className="phone-details__price">
                          {Math.floor(price[0] * (100 - price[1]) / 100)}
                        </p>
                      )
                      : <p className="phone-details__price">{price[0]}</p>
                    }
                    {price[1]
                      ? <p className="phone-details__price-old">{price[0]}</p>
                      : ''
                    }
                  </div>
                  <div className="phone-details__buttons">
                    <button
                      type="button"
                      className={
                        isInBasket
                          ? 'phone-details__add-button--in-basket'
                          : 'phone-details__add-button'
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
                        className="phone-details__favorite-button"
                      />
                    </button>
                  </div>
                  <div className="phone-details__main-container">
                    <div className="phone__details details">
                      <p className="details__title">Screen</p>
                      <p className="details__value">
                        {phoneData.display.screenSize
                          ? `${phoneData.display.screenSize.split(' ')[0]}"`
                          : ''
                        }
                        {' '}
                        {phoneData.display.typeScreen}
                      </p>
                    </div>
                    <div className="phone__details details">
                      <p className="details__title">Resolution</p>
                      <p className="details__value">
                        {phoneData.display.screenResolution}
                      </p>
                    </div>
                    <div className="phone__details details">
                      <p className="details__title">Processor</p>
                      <p className="details__value">{phoneData.processor}</p>
                    </div>
                    <div className="phone__details details">
                      <p className="details__title">RAM</p>
                      <p className="details__value">{phoneData.storage.ram}</p>
                    </div>

                  </div>
                </div>
              </div>
              <p className="phone-details__id">
                ID:
                {phoneData.id}
              </p>
              <div className="phone-details__description-container">
                <div className="phone-details__about about">
                  <p className="about__main-title">About</p>
                  {phoneData.description.map(item => (
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
                <div className="phone-details__tech-specs tech-specs">
                  <p className="tech-specs__title">Tech specs</p>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Screen</p>
                    <p className="tech-specs__value">
                      {phoneData.display.screenSize
                        ? `${phoneData.display.screenSize.split(' ')[0]}"`
                        : ''
                      }
                      {' '}
                      {phoneData.display.typeScreen}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Resolution</p>
                    <p className="tech-specs__value">
                      {phoneData.display.screenResolution}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Processor</p>
                    <p className="tech-specs__value">{phoneData.processor}</p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">RAM</p>
                    <p className="tech-specs__value">{phoneData.storage.ram}</p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Built in memory</p>
                    <p className="tech-specs__value">
                      {phoneData.storage.flash}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Camera</p>
                    <p className="tech-specs__value">
                      {phoneData.camera.primary}
                    </p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Zoom</p>
                    <p className="tech-specs__value">{phoneData.camera.zoom}</p>
                  </div>
                  <div className="tech-specs__details">
                    <p className="tech-specs__property">Cell</p>
                    <p className="tech-specs__value">
                      {phoneData.connectivity.cell}
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
  setPhones: loadPhones,
  addPhoneInBasket: addBasketItem,
  deleteFromFeatured: deleteFeaturedItem,
  addPhoneInFutured: addFeaturedItem,
};

const mapStateToProps = (
  state: PhoneCatalogStore,
  ownProps: RouteComponentProps<TParams>,
) => {
  const { phoneId } = ownProps.match.params;

  return {
    phones: getPhones(state),
    getLoading: getIsError(state),
    price: getPriceById(state, phoneId, goodsOptions.phone),
    isInBasket: getIsInBasketGood(state, phoneId),
    isInFeatured: getIsInFeaturedGood(state, phoneId),
    phone: getPhoneById(state, phoneId),
  };
};

export default connect(mapStateToProps, dispatchMapToProps)(PhoneDetailsPage);
