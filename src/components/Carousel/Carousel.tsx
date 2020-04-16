import React, { FC, useState } from 'react';
import './Carousel.scss';

import arrowUp from '../../img/arrow_up.svg';
import Phone from '../Phone/Phone';
import Tablet from '../Tablet/Tablet';
import Accessory from '../Accessory/Accessory';
import { goodsOptions } from '../../util/enums';

interface Props {
  goods: FeaturedGood[];
}

export const Carousel: FC<Props> = ({ goods }) => {
  const [position, setPosition] = useState(0);

  const onPrevClick = () => {
    setPosition(position - 1);
  };

  const onNextClick = () => {
    setPosition(position + 1);
  };

  return (
    <>
      <div className="carousel__buttons">
        <button
          className="carousel__button"
          type="button"
          onClick={onPrevClick}
          disabled={!position}
        >
          <img className="carousel__prev" src={arrowUp} alt="" />

        </button>
        <button
          className="carousel__button"
          type="button"
          onClick={onNextClick}
          disabled={position >= goods.length - 4}
        >
          <img className="carousel__next" src={arrowUp} alt="" />
        </button>
      </div>
      <div className="carousel__screen">
        <ul
          className="carousel__list"
          style={{ marginLeft: `${position * (-280)}px` }}
        >
          {goods.map(good => {
            if (good.goodCategory === goodsOptions.phone) {
              return <li key={good.id}><Phone phone={good} /></li>;
            }

            if (good.goodCategory === goodsOptions.tablet) {
              return <li key={good.id}><Tablet tablet={good as Tablet} /></li>;
            }

            if (good.goodCategory === goodsOptions.accessory) {
              return <li key={good.id}><Accessory accessory={good} /></li>;
            }

            return '';
          })}
        </ul>
      </div>
    </>
  );
};
