import React, { FC } from 'react'
import './Phone.scss'
import heart from './../../img/heart.png'
import { Link } from 'react-router-dom'

interface Props {
  phone: Phone;
}

export const Phone: FC<Props> = ({ phone }) => {
  const { id, imageUrl, name, regularPrice, discount, screenSize, screenType, flash, ram} = phone

  return (
    <div className="phone">
      <Link to={`/phones/${id}`} className="phone__img-container">
        <img src={imageUrl} alt="phone" className="phone__img"/>
      </Link>
      <Link to={`/phones/${id}`} className="phone__title">
        {name}
      </Link>
      <div className="phone__price">
        <h2 className="phone__discount">
          {regularPrice && discount ? ~~(+(regularPrice) * (1 - discount  / 100)) : regularPrice }
        </h2>

          {regularPrice && discount
            ? <h2 className="phone__regular-price">{regularPrice}</h2>
            : ''
          }
      </div>
      <div className="phone__details details">
        <p className="details__title">Screen</p>
        <p className="details__value">
          {screenSize ? screenSize + '"' : ''} {screenType}
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
        <button className="phone__add-button">Add to cart</button>
        <button>
          <img src={heart} alt='favorite button'  className="phone__favorite-button"/>
        </button>
      </div>
    </div>
  )
}
