import React, { FC, useEffect, useState, Fragment } from 'react'
import './PhoneDetailsPage.scss'
import { RouteComponentProps, Link } from 'react-router-dom'
import home from './../../img/home.svg'
import { loadPhoneFromAPI } from '../../util/util'
import { Loader } from '../Loader/Loader'
import heart from './../../img/heart.png'


type TParams = {phoneId: string}

export const PhoneDetailsPage:FC<RouteComponentProps<TParams>> = ({match}) => {
  const [phoneData, setPhoneData] = useState<PhoneDetails | null>(null)
  const [currentImg, setCurrentImg] = useState(0);
  const [isPhoneRequested, setIsPhoneRequested] = useState(false);

  useEffect( () => {
    loadPhoneFromAPI(match.params.phoneId)
      .then(
        data => {
          console.log(data)
          setIsPhoneRequested(true)
          return setPhoneData(data)
        },
        error => {
          console.log('error data', error)
          setPhoneData(null)
          setIsPhoneRequested(true)
        }
      )
  },[match.params.phoneId])
//  console.log(phoneData)
//  console.log(match.params)


  return !phoneData && !isPhoneRequested
    ? <Loader />
    : (
    <div className="phone-details__container">
      <div className="link-chain">
        <Link
          to="/"
          className="mini-link link-chain__item"
        >
          <img src={home} alt="home link" className="mini-link__img"/>
        </Link>
        <p className="link-chain__item ">></p>
        <Link
          to="/phones"
          className="link-chain__item"
        >
          Phones
        </Link>
        <p className="link-chain__item">></p>
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
        ?  <p>Page not Found</p>
        :
      <>
      <div className="phone-details__main-discription-container">
        <div className="phone-details__imgs-container imgs-container">
          <ul className="imgs-container__gallery">
            {phoneData.images.map((item, i) => {
              return <li
                className={'imgs-container__item' + (i === currentImg ? " imgs-container__item--active" : "" )}
                key={item}
                onMouseOver={() => {setCurrentImg(i)}}
              >
                <img className="imgs-container__img" src={item}/>
              </li>
            })}
          </ul>
          <div className="imgs-container__main-img-container">
            <img
              src={phoneData.images[currentImg]}
              alt="current phone"
              className="imgs-container__main-img"
            />
          </div>
        </div>
        <div className="phone-details__main-properties">
          <div className="color-container">
            <p className="color-container__title">Available colors</p>
            <ul className="color-container__list">
              {phoneData.avalibleColors.map(color1 => (
                <Fragment key={color1.title}>
                <Link
                  key={color1.title}
                  to={`/phones/${match.params.phoneId.replace(/gb_.+/gim,`gb_${color1.title}`)}`}
                  className={'color-container__outer-border'
                + (color1.title === phoneData.color
                  ? " color-container__outer-border--active"
                  : "")
              }
                >
                  <div
                    className="color-container__item"
                    style={{backgroundColor: color1.value}}
                    title={color1.title.replace(/_/g," ")}
                  />
                </Link>
                </Fragment>
              ))}
            </ul>
          </div>
          <hr/>
          <div className="memory-container">
            <p className="memory-container__title">Select capacity</p>
            <ul className="memory-container__list">
              {phoneData.storage.availableFlash.map(item => (
                <li
                  key={item}
                  className={"memory-container__item"
                  + (phoneData.storage.flash === item
                    ? " memory-container__item--active"
                    : "")}
                >
                  <Link
                    to={"/phones/" + match.params.phoneId.replace(/_\d*gb_/gi, `_${item}_`.toLowerCase())}
                    className={"memory-container__link"
                    + (phoneData.storage.flash === item
                      ? " memory-container__link--active"
                      : "")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <hr/>
          <div className="phone__price">

          </div>
          <div className="phone-details__buttons">
            <button className="phone-details__add-button">Add to cart</button>
            <button>
              <img src={heart} alt='favorite button'  className="phone-details__favorite-button"/>
            </button>
          </div>
          <div className="phone-details__main-container">
            <div className="phone__details details">
              <p className="details__title">Screen</p>
              <p className="details__value">
                {phoneData.display.screenSize
                  ? phoneData.display.screenSize.split(' ')[0] + '"'
                  : ''
                } {phoneData.display.typeScreen}
              </p>
            </div>
            <div className="phone__details details">
              <p className="details__title">Resolution</p>
              <p className="details__value">{phoneData.display.screenResolution}</p>
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
      <p className="phone-details__id">ID: {phoneData.id}</p>
      <div className="phone-details__description-container">
        <div className="phone-details__about about">
          <p className="about__main-title">About</p>
          {phoneData.description.map(item =>(
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
                ? phoneData.display.screenSize.split(' ')[0] + '"'
                : ''
              } {phoneData.display.typeScreen}
            </p>
          </div>
          <div className="tech-specs__details">
            <p className="tech-specs__property">Resolution</p>
            <p className="tech-specs__value">{phoneData.display.screenResolution}</p>
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
            <p className="tech-specs__value">{phoneData.storage.flash}</p>
          </div>
          <div className="tech-specs__details">
            <p className="tech-specs__property">Camera</p>
            <p className="tech-specs__value">{phoneData.camera.primary}</p>
          </div>
          <div className="tech-specs__details">
            <p className="tech-specs__property">Zoom</p>
            <p className="tech-specs__value">{phoneData.camera.zoom}</p>
          </div>
          <div className="tech-specs__details">
            <p className="tech-specs__property">Cell</p>
            <p className="tech-specs__value">{phoneData.connectivity.cell}</p>
          </div>
        </div>
      </div>
      </>
      }
    </div>

  )
}

/*
function mapStateToProps(state: PhoneCatalogStore, ownProps: RouteComponentProps<TParams>) {
  const { phoneId } = ownProps.match.params;

  return {
    dataFromCatalog: getDataById(state, phoneId)
  }
}

export default connect(mapStateToProps)(PhoneDetailsPage)
*/
