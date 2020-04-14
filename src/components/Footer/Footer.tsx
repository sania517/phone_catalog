import React, { FC } from 'react';
import './Footer.scss';

import { HashLink } from 'react-router-hash-link';

import { Link } from 'react-router-dom';
import logoPath from '../../img/logo_lol.png';
import arrowUp from '../../img/arrow_up.svg';

export const Footer: FC = () => (
  <footer className="footer">
    <Link to="/" className="footer__logo">
      <img src={logoPath} alt="Logo" />
    </Link>
    <nav className="footer__contacts-nav">
      <a
        className="footer__contacts-link"
        href="http://http://github.com/sania517/phone_catalog"
      >
        Github
      </a>
      <a
        className="footer__contacts-link"
        href="http://http://github.com/sania517/phone_catalog"
      >
        Contacts
      </a>
      <a
        className="footer__contacts-link"
        href="http://http://github.com/sania517/phone_catalog"
      >
        rights
      </a>
    </nav>
    <div className="footer__back-container">
      <p className="footer__back-text">Back to top</p>
      <HashLink to="#top-anchor" className="footer__back-link">
        <img className="footer__back-img" src={arrowUp} alt="top link" />
      </HashLink>
    </div>
  </footer>
);
