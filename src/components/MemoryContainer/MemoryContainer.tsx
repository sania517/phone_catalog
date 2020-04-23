import React, { FC } from 'react';
import './MemoryContainer.scss';
import { Link, useParams } from 'react-router-dom';

interface Props {
  flashOptions: string[];
  currentFlash: string;
}

export const MemoryContainer: FC<Props> = (props) => {
  const { flashOptions, currentFlash } = props;
  const param = useParams<{phoneId: string}>();

  return (
    <>
      <div className="memory-container">
        <p className="memory-container__title">Select capacity</p>
        <ul className="memory-container__list">
          {flashOptions.map(item => (
            <li
              key={item}
              className={`memory-container__item${
                currentFlash === item
                  ? ' memory-container__item--active'
                  : ''}`}
            >
              <Link
                to={`/phones/${param.phoneId
                  .replace(/_\d*gb_/gi, `_${item}_`
                    .toLowerCase())}`
                }
                className={`memory-container__link${
                  currentFlash === item
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
    </>
  );
};
