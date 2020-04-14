import React, { FC } from 'react';
import './Pagination.scss';
import arrowUp from '../../img/arrow_up.svg';

interface Props {
  countPages: number;
  onClickHandler(activePage: number): void;
  activePage: number;
}

export const Pagination: FC<Props> = (props) => {
  const { countPages, onClickHandler, activePage } = props;

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button-navigate"
        disabled={activePage === 0}
        onClick={() => {
          onClickHandler(activePage - 1);
        }}
      >
        <img
          src={arrowUp}
          alt=""
          className="pagination__button-left"
        />
      </button>

      <ul className="pagination__list">
        {new Array(countPages).fill('').map((item, index) => (
          <li key={index * 2} className="pagination__page">
            <button
              type="button"
              disabled={activePage === index}
              className={
                activePage === index
                  ? 'pagination__button-page--active'
                  : 'pagination__button-page'
              }
              onClick={() => {
                onClickHandler(index);
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pagination__button-navigate"
        disabled={activePage === countPages - 1}
        onClick={() => {
          onClickHandler(activePage + 1);
        }}
      >
        <img
          src={arrowUp}
          alt=""
          className="pagination__button-right"
        />
      </button>
    </div>
  );
};
