import React, { FC, useState, useEffect } from 'react';
import './ImagesContainer.scss';
import { useParams } from 'react-router-dom';

interface Props {
  images: string[];
}

export const ImagesContainer: FC<Props> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const param = useParams<{phoneId: string}>();

  useEffect(() => {
    setCurrentImg(0);
  }, [param.phoneId]);

  return (
    <div className="tablet-details__imgs-container imgs-container">
      <ul className="imgs-container__gallery">
        {images.map((item, i) => {
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
          src={images[currentImg]}
          alt="current tablet"
          className="imgs-container__main-img"
        />
      </div>
    </div>

  );
};
