import React, { FC, useState } from 'react';
import './Banner.scss';
import arrowUp from '../../img/arrow_up.svg';

interface Props {
  banners: Banner[];
}

export const Banner: FC<Props> = ({ banners }) => {
  const [position, setPosition] = useState(0);

  const onPrevButton = () => {
    setPosition(position - 1);
  };

  const onNextButton = () => {
    setPosition(position + 1);
  };

  return (
    <div className="banner">
      <div className="banner__contents">
        <button
          type="button"
          className="banner__button"
          onClick={onPrevButton}
          disabled={!position}
        >
          <img src={arrowUp} alt="" className="banner__button-prev" />
        </button>
        <div
          className="banner__images-wrapper"
        >
          <ul
            className="banner__list"
            style={{ marginLeft: `${position * (-1040)}px` }}
          >
            {banners.map(item => (
              <li key={item.id} className="banner__img-wrapper">
                <img
                  src={item.imageUrl}
                  alt="phones banner"
                  className="banner__img"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="banner__button"
          onClick={onNextButton}
          disabled={position === banners.length - 1}
        >
          <i><img src={arrowUp} alt="" className="banner__button-next" /></i>
        </button>
      </div>
      <div className="banner__points">
        {banners.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPosition(index)}
            className={
              index !== position
                ? 'banner__point'
                : 'banner__point--active'
            }
          />
        ))}
      </div>
    </div>
  );
};
