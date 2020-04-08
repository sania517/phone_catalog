import React, { FC } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logoPath from './../../img/logo_lol.png'
import search from './../../img/search.png'
import heart from './../../img/heart.png'
import shopping_bag from './../../img/shopping_bag.png'
import './Header.scss'
import './second-nav.scss'

export const Header:FC = () => (
  <header className="header">
    <Link to="/" className="header__logo">
      <img src= {logoPath} alt="Logo"/>
    </Link>
    <nav className="header__main-nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink
            to="/"
            className="header__nav-link"
            activeClassName="header__nav-link--active"
            exact
          >
            home
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink
            to="/phones"
            className="header__nav-link"
            activeClassName="header__nav-link--active"
          >
            Phones
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink
            to="/"
            className="header__nav-link"
            activeClassName="header__nav-link--active"
            exact
            >
              Tablets
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink
            to="/"
            className="header__nav-link"
            activeClassName="header__nav-link--active"
            exact
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
    <div className="header__second-nav second-nav">
      <label  className="second-nav__search">
        <input type="text"  className="second-nav__input" placeholder="Search"/>
        <img src={search} alt="search"  className="second-nav__search-img"/>
      </label>
      <NavLink
        to="/"
        className="second-nav__heart-link"
        activeClassName="second-nav__heart-link--active"
        exact
      >
        <img src={heart} alt="heart" className="second-nav__link-img"/>
      </NavLink>
      <NavLink
        to="/basket"
        className="second-nav__bag-link"
        activeClassName="second-nav__bag-link--active"
        exact
      >
        <img src={shopping_bag} alt="shopping_bag" className="second-nav__link-img"/>
      </NavLink>
    </div>




  </header>
)
