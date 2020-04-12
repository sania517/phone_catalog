import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCountAllGoodsInBasket, getFeatured } from '../../store/selectors';
import logoPath from '../../img/logo_lol.png';
import search from '../../img/search.png';
import heart from '../../img/heart.png';
import shoppingBag from '../../img/shopping_bag.svg';
import './Header.scss';
import './second-nav.scss';

interface Props {
  basketCountGoods: number;
  featuredGoods: [string, Phone][];
}

const Header: FC<Props> = ({ basketCountGoods, featuredGoods }) => {
  const feateredCount = featuredGoods.length;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logoPath} alt="Logo" />
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
              to="/tablets"
              className="header__nav-link"
              activeClassName="header__nav-link--active"
            >
                Tablets
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink
              to="/accessories"
              className="header__nav-link"
              activeClassName="header__nav-link--active"
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header__second-nav second-nav">
        <label className="second-nav__search">
          <input
            type="text"
            className="second-nav__input"
            placeholder="Search"
          />
          <img src={search} alt="search" className="second-nav__search-img" />
        </label>
        <NavLink
          to="/featured"
          className="second-nav__heart-link"
          activeClassName="second-nav__heart-link--active"
          exact
        >
          <img src={heart} alt="heart" className="second-nav__link-img" />
          {
            feateredCount
              ? <div className="shopping_bag__count-round">{feateredCount}</div>
              : ''
          }
        </NavLink>
        <NavLink
          to="/basket"
          className="second-nav__bag-link"
          activeClassName="second-nav__bag-link--active"
          exact
        >
          <img
            src={shoppingBag}
            alt="shopping_bag"
            className="second-nav__link-img"
          />
          {
            basketCountGoods
              ? (
                <div className="shopping_bag__count-round">
                  {basketCountGoods}
                </div>
              )
              : ''
          }
        </NavLink>
      </div>
    </header>
  );
};

const dispatchMapToProps = {
  // setPhones: loadPhones,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  basketCountGoods: getCountAllGoodsInBasket(state),
  featuredGoods: getFeatured(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Header);
