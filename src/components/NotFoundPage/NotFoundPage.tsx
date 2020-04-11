import React, { FC } from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';
import home from '../../img/home.svg';

export const NotFoundPage: FC = () => {
  return (
    <div className="not-found__container">
      <Link
        to="/"
        className="mini-link"

      >
        <img src={home} alt="home link" className="mini-link__img" />
      </Link>
      <h2 className="not-found__text">Page not found</h2>
    </div>
  );
};
