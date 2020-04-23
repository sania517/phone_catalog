import React, { FC, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCountAllGoodsInBasket,
  getFeatured,
  getQuery,
} from '../../store/selectors';
import logoPath from '../../img/logo_lol.png';
import search from '../../img/search.png';
import heart from '../../img/heart.png';
import shoppingBag from '../../img/shopping_bag.svg';
import './Header.scss';
import './second-nav.scss';
import { setFilterQuery } from '../../store/actionCreators';

interface Props {
  basketCountGoods: number;
  featuredGoods: FeaturedGood[];
  query: string;
  setQuery: (newQuery: string) => void;
}

const Header: FC<Props> = (props) => {
  const {
    basketCountGoods,
    featuredGoods,
    query,
    setQuery,
  } = props;

  const currentUrl = useHistory().location.pathname;
  const feateredCount = featuredGoods.length;
  const visibility = currentUrl.search(/basket/) > -1
    ? 'hidden'
    : 'visible';

  useEffect(() => {
    setQuery('');
  }, [currentUrl, setQuery]);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logoPath} alt="Logo" />
      </Link>
      <nav
        className="header__main-nav"
        style={{ visibility }}
      >
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
        <label className="second-nav__search" style={{ visibility }}>
          <input
            type="text"
            className="second-nav__input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <img src={search} alt="search" className="second-nav__search-img" />
        </label>
        <NavLink
          to="/featured"
          className="second-nav__heart-link"
          activeClassName="second-nav__heart-link--active"
          exact
          style={{ visibility }}
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
  setQuery: setFilterQuery,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  basketCountGoods: getCountAllGoodsInBasket(state),
  query: getQuery(state),
  featuredGoods: getFeatured(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Header);
